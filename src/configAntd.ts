// import all used components in whole projects

import { Avatar, Button, Spin, Modal, Drawer, Card, Tag,Carousel,Collapse,
    Layout, ConfigProvider,Tabs, Menu, Row, Col, Checkbox,Upload,DatePicker,Table,
    Form, Dropdown, Input,InputNumber, Slider, Radio, Select } from 'ant-design-vue'
  import { App } from 'vue'
  const components = [
    Avatar,Button,Spin,Modal,Drawer,Card, Card.Meta,Tag,
    Layout,Carousel,
    Table,ConfigProvider,
    Radio,
    DatePicker.RangePicker,
    Layout.Header,
    Checkbox,Upload,
    Layout.Footer,
    Layout.Sider,
    Layout.Content,
    Collapse,Collapse.Panel,
    Tabs,Tabs.TabPane,Menu,
    Menu.Item,
    Row, Col,Form,Form.Item,Dropdown,
    Dropdown.Button,
    Input,
    InputNumber,
    Input.TextArea,
    Slider,
    Radio.Group,
    Radio.Button,
    Select,
    Select.Option
  ]
  const install = (app: App) => {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
  export default {
    install
  }
  
  
  
  