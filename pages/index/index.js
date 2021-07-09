//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabIndex: 0,
    shuju:[],
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    myScroll:"", 
    isTop: 0 , 
    bottomFlag: false,
    // 提交的订单
    orders: true,
    menus: [{
      id: 1,
      menu: '菜单'
    }],
    // 商品列表
    items: [{
      id: 1,
      url:"../index/image/01.jpg",
      title: '辣椒小炒肉',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2,
      url:"../index/image/02.jpg",
      title: '鱼香肉丝',
      price: 13,
      active: false,
      num: 1
    }, {
      id: 3,
      url:"../index/image/03.jpg",
      title: '粉蒸肉',
      price: 14,
      active: false,
      num: 1
    }, {
      id: 4,
      url:"../index/image/04.jpg",
      title: '蒜苗回锅肉',
      price: 15,
      active: false,
      num: 1
    }, {
      id: 5,
      url:"../index/image/05.jpg",
      title: '土豆加藕',
      price: 16,
      active: false,
      num: 1
    }, {
      id: 6,
      url:"../index/image/06.jpg",
      title: '石锅拌饭',
      price: 17,
      active: false,
      num: 1
    }, {
      id: 7,
      url:"../index/image/07.jpg",
      title: '橙汁',
      price: 18,
      active: false,
      num: 1
    },{
      id: 8,
      url:"../index/image/08.jpg",
      title: '牛奶',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 9,
      url:"../index/image/09.jpg",
      title: '奶茶',
      price: 13,
      active: false,
      num: 1
    }, {
      id: 10,
      url:"../index/image/10.jpg",
      title: '甜点1',
      price: 14,
      active: false,
      num: 1
    }, {
      id: 11,
      url:"../index/image/11.jpg",
      title: '甜点2',
      price: 15,
      active: false,
      num: 1
    }, {
      id: 12,
      url:"../index/image/12.jpg",
      title: '甜点3',
      price: 16,
      active: false,
      num: 1
    }]
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    setTimeout(()=>{
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  tabMenu: function(event) {
    let index = event.target.dataset.index;
    this.setData({
      tabIndex: index
    });
  },
  // 点击去购物车结账
  card: function() {
    let that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车订单也
      wx.redirectTo({
        url: '../order/order'
      });
    } else {
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  addOrder: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    // var shuju=subOrders;
    // console.log(shuju)
    // console.log(subOrders)
    param.active ? param.active = false : param.active = true;
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    // 将已经确定的菜单添加到购物单列表
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });
    // 判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }
    let money = 0;
    let num = subOrders.length;
    subOrders.forEach(item => {
      console.log(item)
      money += item.price; // 总价格求和
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
    // 将选中的商品存储在本地
    wx.setStorage({
      key: "orders",
      data: subOrders
      
    });
  },
  onLoad: function() {
    var that = this
    that.setdata({
      shuju:subOrders,
      
    })
    console.log(shuju)

  },
  drink: function () {
    wx.pageScrollTo({
      scrollTop: 670,
    });
},
rice: function () {
  wx.pageScrollTo({
    scrollTop: 0,
  });
},
dessert: function () {
  wx.pageScrollTo({
    scrollTop: 1000,
  });
},

})