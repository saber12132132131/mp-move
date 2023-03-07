// components/mp-move/mp-move.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     list:{
       type:Array,
       value:[]
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMove:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTouchstart(e){
      console.log(e)
    },
    toggleShowMove(){
      this.setData({
        showMove:!this.data.showMove
      })
    }
  }
})
