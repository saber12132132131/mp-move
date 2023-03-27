// components/windowied/windowied.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    key: {
      type: String,
      value: "",
    },
    list: {
      type: Array,
      value: [],
    },
    index: {
      type: Number,
      value: null
    },
    startIndex: {
      type: Number,
      value: null
    },
    endIndex: {
      type: Number,
      value: null
    }
  },
  lifetimes: {
    attached() {
      this.isTopFirst = true
      this.isBottomFirst = true
      this.obTop = this.createIntersectionObserver({
        thresholds: [0]
      })
      this.obBottom = this.createIntersectionObserver({
        thresholds: [0]
      })

      this.obTop.relativeTo(".top").observe('.window', (res) => {
        if (this.isTopFirst) {
          this.lastTopIntersectionRatio = 0
          this.isTopFirst = false
        }
        if (res.intersectionRatio == 0 && this.lastTopIntersectionRatio !== 0) {
          this.triggerEvent("topouter", {
            index: this.data.index
          })
        }
        if (res.intersectionRatio !== 0 && this.lastTopIntersectionRatio == 0) {
          this.triggerEvent("topenter", {
            index: this.data.index
          })
        }
        this.lastTopIntersectionRatio = res.intersectionRatio
      })

      this.obBottom.relativeTo(".bottom").observe('.window', (res) => {
        if (this.isBottomFirst) {
          this.lastBottomIntersectionRatio = 0
          this.isBottomFirst = false
        }
        if (res.intersectionRatio == 0 && this.lastBottomIntersectionRatio !== 0) {
          this.triggerEvent("bottomouter", {
            index: this.data.index
          })
        }
        if (res.intersectionRatio !== 0 && this.lastBottomIntersectionRatio == 0) {
          this.triggerEvent("bottomenter", {
            index: this.data.index
          })
        }
        this.lastBottomIntersectionRatio = res.intersectionRatio
        //  event.emit("disapper",key)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  observers: {
    "startIndex": function (val) {
      const index = this.data.index
      if (index > val && index < this.data.endIndex) {
        this.setData({
          show: true
        })
      }else{
        this.setData({
          show: false
        }) 
      }
    },
    "endIndex": function (val) {
      const index = this.data.index
      if (index < val && index > this.data.startIndex) {
        this.setData({
          show: true
        })
      }else{
        this.setData({
          show: false
        }) 
      }
    }
  },
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})