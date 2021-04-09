import {wxPath, path, request, upload} from '../../utils/util'
Page({
    data: {
        tabActive: 'info',

        app: {},
        fileName: '',
        attach: {},
        date: '请选择',
        time: '09:00',

        schoolPrintType: '',

        gradeList: [],
        gradeIndex: '',

        dataTypeList: [],
        dataTypeIndex: 0,

        printTypeList: [],
        printTypeIndex: 0,

        disabled: false,

        opinionitems: [
            { value: 1, name: '同意', checked: true},
            { value: 0, name: '不同意'},
        ],
        opinion: 1,
        opinionList: [
            {value:0, label: '文印数字不符'},
            {value:1, label: '文印类型不符'},
            {value:2, label: '材料类型不符'},
            {value:3, label: '预计取件时间不符'},
        ],
        opinionIndex: 0,
        opinionInput: '文印数字不符',
        enclosure: 1,
        enclosureitems: [
            {value:1, name: '选择附件', checked: true},
            {value:2, name: '输入附件名称'},
        ],
        applyrules: [
            {
                name: 'grade',
                rules: { required: true, message: '部门必填' },
            },
            {
                name: 'pages',
                rules: { required: true, message: '页数必填' },
            },
            {
                name: 'copies',
                rules: { required: true, message: '份数必填' },
            },
        ]
    },
    onLoad(option) {
        Object.keys(option).length > 0 && 
        (option.print  = option.print == 1) && this.setData({
            disabled: true,
            option: option
        })
        this.getData()
    },
    opinionRadioChange(e) {
         this.setData({
            opinion :  e.detail.value,
            [`app.pass`]: e.detail.value
         })
    },
    enclosureRadioChange(e) {
        this.setData({
           enclosure :  e.detail.value,
           [`app.fileType`]: e.detail.value
        })
   },
    opinionChange(e) {
        let index = e.detail.value;
        let label = this.data.opinionList[index].label
        this.setData({
            opinionIndex: index,
            [`app.result`]: label,
            [`app.pass`]: index,
        })
    },
    getData() {
        request({
            url: wxPath + "/print/app-edit-info",
            method: 'POST',
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: this.data.option ? this.data.option : {}
        }).then(res => {
            let {app, gradeList, dataTypeList, printTypeList, schoolPrintType, attach} = res.data
            app.applicationDate = app.applicationDate || new Date().getTime()
            let _index = gradeList.findIndex((item , index) => {
                return item.deptId == app.grade
            })
            this.setData({
                app: app || this.data.app,
                gradeList: (gradeList && [].concat(gradeList)) || this.data.gradeList,
                gradeIndex: _index != -1 ? _index : '',
                attach: attach,
                dataTypeList: dataTypeList || this.data.dataTypeList,
                printTypeList: printTypeList || this.data.printTypeList,
                schoolPrintType: schoolPrintType || this.data.schoolPrintType
            })
            !this.data.option && (
                this.setData({
                    [`app.fileType`]: 1
                })
            )
            this.data.option && (this.setData({
                [`app.pages`]: attach.pages,
                [`app.copies`]: attach.copies,
                [`app.editions`]: attach.editions,
                [`app.papers`]: attach.papers,
                [`app.taskId`]: this.data.option.taskId,
                [`app.workflowId`]: this.data.option.workflowId,
            }))
        })
    },
    tabClick(e) {
        this.setData({
            tabActive: e.currentTarget.dataset.name
        })
    },
    bindGradeChange(e) {
        let index = e.detail.value;
        this.setData({
            gradeIndex: index,
            [`app.grade`]: this.data.gradeList[index].deptId
        })
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value,
        })
    },
    bindTimeChange(e) {
        this.setData({
            time: e.detail.value,
        })
    },
    bindDataTypeChange(e) {
        let index = e.detail.value;
        let dataType = this.data.dataTypeList[index].dictValue
        this.setData({
            dataTypeIndex: index,
            [`app.dataType`]: dataType
        })
        request({
            url: path + '/print/getPrintType',
            data: {
                schoolPrintType: this.data.schoolPrintType,
                dataType: dataType
            }
        }).then(res => {
            this.setData({
                printTypeList: res || this.data.printTypeList
            })
        })
    },
    bindPrintTypeChange(e) {
        let index = e.detail.value;
        this.setData({
            printTypeIndex: index,
            [`app.printType`]: this.data.printTypeList[index]
        })
    },
    formInputChange(e) {
        const { field } = e.currentTarget.dataset
        if(field == 'typeName') {
            let _data = this.data.app
            delete _data.fileName
            this.setData({
                app: _data
            })
        }
        this.setData({
            [`app.${field}`]: e.detail.value
        })
    },
    onDownLoad(e) {
        wx.downloadFile({
            url: wxPath+'/attach/download?attachId='+ this.data.attach.attachId,
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function (res) {
                // console.log(res)
                const tempFilePath = res.tempFilePath;
                // 保存文件
                wx.saveFile({
                    tempFilePath,
                    success: function (res) {
                        const savedFilePath = res.savedFilePath;
                        // console.log(res)
                        // 打开文件
                        wx.openDocument({
                            filePath: savedFilePath,
                            success: function (res) {
                            // console.log(res)
                            },
                        });
                    },
                    fail: function (err) {
                        // console.log('保存失败：', err)
                        this.setData({
                            error: err
                        })
                    }
                });
            },
            fail: function (err) {
            console.log('下载失败：', err);
            },
        });
    },
    onUpLoad(res) {
        const that = this;
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: ["doc", "docx", "xls", "xlsx", "pptx","ppt", "pdf"],
            success (res) {
                if(res.tempFiles && res.tempFiles.length > 0) {
                    const tempFilePaths = res.tempFiles
                    upload({
                      url: path + '/attach/uploadfile', //仅为示例，非真实的接口地址
                      filePath: tempFilePaths[0].path,
                      name: 'file_data'
                    }).then (res => {
                        that.setData({
                            [`attach.attachId`]: res.attach.attachId,
                            [`app.attachId`]: res.attach.attachId,
                            [`fileName`]: res.attach.fileName,
                        })
                        let _data = that.data.app
                        delete _data.typeName
                        that.setData({
                            app: _data
                        })
                    }).catch(res => {
                        // console.log(res)
                    })
                } else {
                    
                }
              }
        })
    },
    submitForm(){
        let c = this.selectComponent('#apply'), that = this
        c.validate((valid, errors) => {
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                let _request = true, _saveData = {};

                this.data.app.fileType == 1 && 
                !this.data.app.fileName && 
                this.setData({
                    error: '请上传附件'
                }) && (_request = false);

                this.data.app.fileType == 2 && 
                !this.data.app.typeName && 
                this.setData({
                    error: '请输入附件名称'
                }) && (_request = false);
                _saveData = {
                    printInfoRep: that.data.app
                }
                _saveData.printInfoRep['dataType'] = this.data.dataTypeList[this.data.dataTypeIndex].dictValue
                _saveData.printInfoRep['printType'] = this.data.printTypeList[this.data.printTypeIndex].dictValue
                let _url = _saveData.printInfoRep.pass==0 ? 'cancel' : 'appsave'
                //文印申请和处理
                _request && (
                    request({
                        url: path + '/print/' + _url,
                        method: 'POST',
                        header: {
                            //设置参数内容类型为x-www-form-urlencoded
                            'content-type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: _saveData
                    }).then(res => {
                        if (res.code == 0) {
                            // 跳转至首页
                            let _surl = '/pages/work/index';
                            this.data.option && (_surl = '/pages/center/index')
                            wx.switchTab({
                                url: _surl,
                            })
                        } else {
                            wx.showModal({
                                title: '请求失败',
                                content: res.msg,
                                showCancel: false
                            })
                        }
                    })
                )
            }
        })
    },
    back() {
        wx.navigateBack()
    }
})