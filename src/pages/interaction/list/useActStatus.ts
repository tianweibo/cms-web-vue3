interface ActStatus {
label: string;
value: number;
}
const actStatus: Array<ActStatus> = [{
    value: 0,
    label: '未开始'
}, {
    value: 1,
    label: '未发布'
}, {
    value: 2,
    label: '暂停中'
}, {
    value: 3,
    label: '已发布'
}, {
    value: 4,
    label: '已结束'
}]

export default function getActStatus() {
    return actStatus
}