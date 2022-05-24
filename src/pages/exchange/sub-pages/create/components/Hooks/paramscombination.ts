import deepClone from 'clone'
function conbaination() {
  const ruleConditionParams = (value: any): any => {
    console.log("value", value);
    const rulesinfo = deepClone(value.rulesinfo);
    const currentData: any = {
      ALL: []
    };
    rulesinfo &&
      rulesinfo.ruleList.forEach(item => {
        console.log(item, "item ------->");
        if (item.validateType === "and") {
          const temp: any = {
            All: []
          };
          if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
              temp["All"].push(child && child.params);
              console.log(child, " child &&");
            });
            currentData.ALL.push(temp);
          }
        } else {
          const temp: any = {
            ANY: []
          };
          if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
              temp["ANY"].push(child && child.params);
              console.log(child, " child &&");
            });
            currentData.ALL.push(temp);
          }
        }
      });
    const type = value.giftInfo.sub.limit.type;
    if (value && value.giftInfo.exchangeControl === "1" && value.giftInfo.sub.limit.type !== "3") {
      currentData.ALL.push({
        ANY: [
          {
            key: type === "1" ? "exchangeLimitDay" : "exchangeLimit",
            operator: "lt",
            value: 1
          }
        ]
      });
    }
    console.log(currentData, "currentDatacurrentData");
    return currentData;
  };
  const ruleEventParams = (value: any) => {
    const result: any = [];
    const rulesinfo = deepClone(value.rulesinfo);
    console.log(rulesinfo, "ruleListSet");
    rulesinfo &&
      rulesinfo.ruleListSet.forEach((item, index) => {
        const eventList = [
          {
            action: "DEDUCE",
            eventSwitch: "Enable",
            eventType: "member_point_topic",
            id: (item && item.id) || 0,
            note: item.name,
            params: JSON.stringify({
              points: item.points
            }),
            ruleId: 0,
            timestamp: 0
          }
        ];
        if (item.type === "and") {
          const condition: any = {
            All: []
          };
          if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
              condition["All"].push(child && child.params);
              console.log(child, " child &&");
            });
          }
          result.push({ eventList, condition: JSON.stringify(condition), id: "" });
          console.log(item.type);
        } else {
          const condition: any = {
            ANY: []
          };
          if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
              condition["ANY"].push(child && child.params);
              console.log(child, " child &&");
            });
          }
          result.push({
            eventList,
            condition: JSON.stringify(condition),
            id: item.id,
            ruleOrder: index + 1
          });
        }
      });
    // deduction.id =
    if (value && value.rulesinfo.deduction.num > 0) {
      const eventList = [
        {
          action: "DEDUCE",
          eventSwitch: "Enable",
          eventType: "member_point_topic",
          id: value.rulesinfo.deduction.id || 0,
          note: "不满足所有兑换扣减规则:",
          params: JSON.stringify({
            points: value.rulesinfo.deduction.num
          }),
          ruleId: 0,
          timestamp: 0
        }
      ];
      result.push({
        eventList,
        condition: "",
        id: value.rulesinfo.deduction.id,
        ruleOrder: 0
      });
    }
    return result;
  };
  const saveFunction = {};
  const submitFunction = {};
  const maxScore = value => {
    const rulesinfo = deepClone(value.rulesinfo);
    const result: any = [];
    rulesinfo &&
      rulesinfo.ruleListSet.forEach(item => {
        result.push(item.points);
      });
    result.push(rulesinfo.deduction.num);
    const max: any = Math.max(...result);
    // if (max == '-Infinity') {
    //   return rulesinfo.deduction.num
    // } else {
    //   return Math.max(...result, ...rulesinfo.deduction.num)
    // }
    return max;
  };
  const minScore = value => {
    const rulesinfo = deepClone(value.rulesinfo);
    const result: any = [];
    rulesinfo &&
      rulesinfo.ruleListSet.forEach(item => {
        result.push(item.points);
      });
    result.push(rulesinfo.deduction.num);
    const min: any = Math.min(...result);
    // if (min == 'Infinity') {
    //   return rulesinfo.deduction.num
    // } else  {
    //   return min
    // }
    return min;
  };
  return { saveFunction, submitFunction, ruleConditionParams, ruleEventParams, maxScore, minScore };
}

export default conbaination;
