import {wxPath, path, request} from '../../utils/util'
Page({
    data: {
        tabActive: 'info',

        app: {},
        date: '请选择',
        time: '09:00',

        schoolPrintType: '',

        gradeList: [{deptName: '请选择部门'}],
        gradeIndex: 0,

        dataTypeList: [],
        dataTypeIndex: 0,

        printTypeList: [],
        printTypeIndex: 0,

        formData: {},
    },
    onLoad() {
        this.getData()
    },
    getData() {
        request({
            url: wxPath + "/print/app-edit-info",
            method: 'POST',
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            data: {}
        }).then(res => {
            let {app, gradeList, dataTypeList, printTypeList, schoolPrintType} = res.data
            console.log(res)
            app.applicationDate = app.applicationDate || new Date().getTime()
            this.setData({
                app: app || this.data.app,
                gradeList: (gradeList && [{deptName: '请选择部门'}].concat(gradeList)) || this.data.gradeList,
                dataTypeList: dataTypeList || this.data.dataTypeList,
                printTypeList: printTypeList || this.data.printTypeList,
                schoolPrintType: schoolPrintType || this.data.schoolPrintType
            })
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
            [`formData.grade`]: this.data.gradeList[index]
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
            [`formData.dataType`]: dataType
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
            [`formData.printType`]: this.data.printTypeList[index]
        })
    },
    onUpLoad(res) {
        wx.chooseMessageFile({
            success (res) {
                console.log(res)
                const tempFilePaths = res.tempFiles
                wx.uploadFile({
                  url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                  filePath: tempFilePaths[0],
                  name: 'file',
                  formData: {
                  },
                  success (res){
                    const data = res.data
                    //do something
                  }
                })
              }
        })
    }
})