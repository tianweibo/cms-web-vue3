export const actMess={
    formSource: "product",
    tables: [
      {
        tableName: "表名称",
        tableUuid: "4344d74b-51c4-45f4-b1c8-aa103d24ed49",
        ascOrder: 0,
        isColumn: 0,
        infos: [
          {
            paraKey: "name",
            paraName: "活动名称",
            msg:"活动名称的范围是3-20",
            placeholder:'请输入活动名称',
            paraUnit: null,
            formType: "the-input",
            regularText: "/^.{3,20}$/",
            sourceJson: null,
            isRequired: 1,
            isExist: true,
            value: ''
          },
          {
            paraKey: "actTime",
            paraName: "活动时间",
            placeholder:'请输入参数',
            msg:"请输入活动的起止时间",
            paraUnit: null,
            formType: "range-picker",
            regularText: "",
            sourceJson: null,
            isRequired: 1,
            isExist: true,
            value: null
          },
          {
            paraKey: "pic",
            paraName: "活动图片",
            placeholder:'请输入参数',
            msg:null,
            paraUnit: "MB",
            formType: "the-upload",
            regularText: "",
            sourceJson:null,
            isRequired: 0,
            isExist: true,
            value: null
          },
          {
            paraKey: "ruleType",
            paraName: "活动规则",
            msg:null,
            placeholder:'请输入参数',
            paraUnit: "MB",
            formType: "the-radio",
            regularText: "",
            sourceJson: [{value:1,label:'文本规则'},{value:2,label:'图文规则'}],
            isRequired: 0,
            isExist: true,
            value: 2,
            dataLink:{
              1:[{
                tableIndex:0,
                value:[{value:1,label:'twb'}],
                param:'sourceJson',
                infosIndex:7
              },{
                tableIndex:0,
                value:true,
                param:'isExist',
                infosIndex:6
              },{
                tableIndex:0,
                value:false,
                param:'isExist',
                infosIndex:5
              }],
              2:[{
                tableIndex:0,
                value:[{value:1,label:'公开推广'},{value:2,label:'自主推广'}],
                param:'sourceJson',
                infosIndex:7
              },{
                tableIndex:0,
                value:false,
                param:'isExist',
                infosIndex:6
              },{
                tableIndex:0,
                value:true,
                param:'isExist',
                infosIndex:5
              }]
            },
          }, {
            paraKey: "ruleBaseMap",
            paraName: "规则底图",
            msg:null,
            placeholder:'请输入参数',
            paraUnit: "MB",
            formType: "the-upload",
            regularText: "",
            sourceJson:null,
            isRequired: 0,
            isExist: true,
            value: null,
          },
          {
            paraKey: "ruleContent",
            paraName: "规则图片",
            placeholder:'请输入参数',
            msg:null,
            paraUnit: "MB",
            formType: "the-upload",
            regularText: "",
            sourceJson:null,
            isRequired: 0,
            isExist: false,
            value: null,
          },
          {
            paraKey: "ruleContent",
            paraName: "规则内容",
            placeholder:'请输入参数',
            msg:'规则内容不能为空',
            paraUnit: "MB",
            formType: "the-textarea",
            regularText: "",
            sourceJson:null,
            isRequired: 1,
            isExist: true,
            value: null
          },
          {
            paraKey: "ifDisplay",
            paraName: "推广方式",
            msg:null,
            placeholder:'请输入参数',
            paraUnit: "MB",
            formType: "the-select",
            regularText: "",
            sourceJson:[{value:1,label:'公开推广'},{value:2,label:'自主推广'}],
            isRequired: 1,
            isExist: true,
            value: 1,
          }
        ]
      }
    ]
  }
