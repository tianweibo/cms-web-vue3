// import {TreeDataItem} from 'ant-design-vue/es/tree/Tree';
// const THREHOLDlIST = [
//   {
//     "id": 24,
//     "name": "积分数",
//     "type": 2,
//   },
//   {
//     "id": 25,
//     "name": "时间段内累计获取积分数",
//     "type": 2
//   },
//   {
//     "id": 26,
//     "name": "时间段内累计消费积分数",
//     "type": 2
//   },
//   {
//     "id": 28,
//     "name": "会员等级",
//     "type": 2
//   }, {
//     "id": 33,
//     "name": "会员勋章",
//     "type": 2
//   }, {
//     "id": 34,
//     "name": "会员标签",
//     "type": 2
//   }, {
//     "id": 36,
//     "name": "时间段内累计订单金额（付款成功）",
//     "type": 1
//   }, {
//     "id": 38,
//     "name": "时间段内累计订单笔数（付款成功）",
//     "type": 1
//   }, {
//     "id": 45,
//     "name": "固定入会时间",
//     "type": 2
//   }, {
//     "id": 46,
//     "name": "成为会员满多长时间",
//     "type": 2
//   }, {
//     "id": 48,
//     "name": "会员生日",
//     "type": 2
//   }, {
//     "id": 49,
//     "name": "年龄段",
//     "type": 2
//   }, {
//     "id": 50,
//     "name": "星座",
//     "type": 2
//   }, {
//     "id": 51,
//     "name": "会员所在省份",
//     "type": 2
//   }, {
//     "id": 52,
//     "name": "会员所在城市",
//     "type": 2
//   }, {
//     "id": 53,
//     "name": "限兑件数",
//     "type": 2
//   }, {
//     "id": 80,
//     "name": "时间段内累计订单笔数（交易成功）",
//     "type": 1
//   }, {
//     "id": 82,
//     "name": "时间段内无成功交易订单",
//     "type": 1
//   }, {
//     "id": 85,
//     "name": "滚动入会时间",
//     "type": 2
//   }, {
//     "id": 86,
//     "name": "时间段内累计订单金额（交易成功）",
//     "type": 1
//   }, {
//     "id": 91,
//     "name": "时间段内预售订单（付款成功）",
//     "type": 1
//   }
// ]
// const descriptions = [
//   {
//     "id": 24,
//     title: '时间段内累计订单金额（付款成功）',
//     p1: '指特定某段时间内，累计付款成功的订单总金额（不含运费',
//     p2: '订单信息在订单量大特别是在大促期间可能会出现延迟或者漏单的情况，请谨慎设置兑换活动订单条件。'
//   },
//   {
//     "id": 86,
//     title: '时间段内累计订单笔数（付款成功',
//     p1: '指特定某段时间内，累计付款成功的订单总笔数）',
//     p2: '订单信息在订单量大特别是在大促期间可能会出现延迟或者漏单的情况，请谨慎设置兑换活动订单条件'
//   },
//   {
//     "id": 91,
//     title: '指特定某段时间内，无成功交易订单',
//     p1: '指特定某段时间内，无成功交易订单',
//     p2: '单信息在订单量大特别是在大促期间可能会出现延迟或者漏单的情况，请谨慎设置活动订单条件。'
//   }
// ]
interface MapRule {
  genData: any[];
  dataList: any[];
}
export default function useThreshold(args: any[]): MapRule {
  console.log(args, 'args------>')
  const genData: any[] = [
    {
      title: '与订单相关条件',
      key: '与订单相关条件',
      type: 1,
      children: ([] as any)
    }, {
      title: '与会员相关条件',
      key: '与会员相关条件',
      type: 2,
      children: ([] as any)
    }
  ];
  const generateData = () => {
    args.forEach(item => {
      if (item.note === '订单') {
        genData[0] && genData[0].children && genData[0].children.push({title: item.metaName, key: item.metaCode, id: item.metaCode, metaType: item.metaType ,type: 1, sceneCode: item.sceneCode, note: item.note, status: item.status, metaCode: item.metaCode})
      } else if (item.note === '会员') {
        genData[1] && genData[1].children && genData[1].children.push({title: item.metaName, key: item.metaCode, id: item.metaCode, metaType: item.metaType, type: 2, sceneCode: item.sceneCode, note: item.note, status: item.status, metaCode: item.metaCode})
      }
    })
    genData.forEach(item => {
      item.children = item.children.filter(item => {
       return item.key !== 'exchangeLimitDay' && item.key !== 'exchangeLimit' && item.key !== 'memberLabel'
      })
    })
    // return tns
    return genData
  };
  generateData()
  const dataList: any[] = [];
  const generateList = (data: any[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({key, title: key as string});
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(genData);

  // const getParentKey = (key: string, tree: any[]): string | number | undefined => {
  //   let parentKey;
  //   for (let i = 0; i < tree.length; i++) {
  //     const node = tree[i];
  //     if (node.children) {
  //       if (node.children.some(item => item.key === key)) {
  //         parentKey = node.key;
  //       } else if (getParentKey(key, node.children)) {
  //         parentKey = getParentKey(key, node.children);
  //       }
  //     }
  //   }
  //   return parentKey;
  // }; 
  return { genData, dataList }
}
