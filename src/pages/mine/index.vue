<template>
  <div class="page">
    <div class="myInfos flex">
      <div class="myInfo-basic flex-basis">
        <div class="myInfo-basic-border">
          <img class="icon icon-logo myInfo-photo" src="/static/images/logo.png" alt="" />
          <span class="myInfo-name">{{myInfo.name}}</span>
        </div>
      </div>
      <div class="myInfo-other flex-item">
        <div>
          <label>手机号：</label>
          <span>{{myInfo.phone}}</span>
        </div>
        <div>
          <label>设备号：</label>
          <span>{{myInfo.deviceNo}}</span>
        </div>
        <div>
          <label>设备有效期：</label>
          <span>{{myInfo.validay}}</span>
        </div>
        <div>
          <label>车型：</label>
          <span>{{myInfo.carType}}</span>
        </div>
        <div>
          <label>车牌号：</label>
          <span>{{myInfo.carNo}}</span>
        </div>
        <div>
          <label>车架号：</label>
          <span>{{myInfo.standNo}}</span>
        </div>
        <div>
          <label>发动机号：</label>
          <span>{{myInfo.engineeNo}}</span>
        </div>
        <div class="btn-bar clearfix">
          <!-- prevent 阻止默认事件（<a> 标签的默认事件是跳href） -->
          <a class="btn-del a-underline pull-left" href="" @click="delAccount()">删除账号</a>
          <a class="a-underline pull-right" href="" @click="logout()">退出登录</a>
        </div>
      </div>
    </div>
    <div class="panel order-panel">
      <div class="panel-header text-left">我的订单</div>
      <div class="panel-body">
        <view class="grid-list">
          <i-grid i-class="vi-grid">
            <i-grid-item i-class="vi-grid-item mine-grid-item" v-for="(grid, gridIndex) in myOrderList" :key="gridIndex" @click="gridClick(grid)">
              <div class="text-center">
                <div class="icon" hover-class="active" :class="'icon-'+grid.icon"></div>
                <div>{{grid.text}}</div>
              </div>
            </i-grid-item>
            </i-row>
          </i-grid>
        </view>
      </div>
    </div>
    <div class="panel order-panel">
      <div class="panel-header text-left">用户设置</div>
      <div class="panel-body">
        <view class="grid-list">
          <i-grid i-class="vi-grid">
            <i-grid-item i-class="vi-grid-item mine-grid-item" v-for="(grid, gridIndex) in userSettingList" :key="gridIndex" @click="gridClick(grid)">
              <div class="text-center">
                <div class="icon" hover-class="active" :class="'icon-'+grid.icon"></div>
                <div>{{grid.text}}</div>
              </div>
            </i-grid-item>
          </i-grid>
        </view>
      </div>
    </div>
    <!-- 删除账号 -->
    <i-modal :visible="visibleDel" :actions="actionsDel" @iclick="clickDel">
      <div class="del-info" style="margin: 20px 70px 0;">删除账号将丢失所有用户的数据,是否删除</div>
    </i-modal>
    <!-- 删除成功 -->
    <vi-dialog :visible="visibleDelSuc" @close="iconDel">
      <div style="margin-top: 18px;">
        <div class="modal-status">删除成功!</div>
        <div class="modal-desinfo">你的用户数据已经删除,感谢使用i following服务</div>
      </div>
    </vi-dialog>
    <!-- 断开已绑定设备 -->
    <i-modal :visible="visibleBreak" :actions="actionsBreak" @ok="handleOk" @cancel="handleCancel">
      <div class="del-info" style="margin-top: 45px;">断开已绑定的设备</div>
    </i-modal>
    <!-- 断开成功 -->
    <vi-dialog :visible="visibleBreakSuc" @close="iconBreak">
      <div style="margin-top: 18px;">
        <div class="modal-status">断开成功!</div>
        <div class="modal-desinfo">已成功断开设备，如需再次使用请重新绑定。</div>
      </div>
    </vi-dialog>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import viDialog from '@/components/dialog';
  export default {
    data() {
      return {
        userSettingList: [
          { text: '提醒信息管理', icon: `mine_promptManage`, url: '../mine/promptManage' },
          { text: '更新车牌', icon: `mine_updateLicensePlate`, url: '../mine/updateCardNo' },
          { text: '变更手机号', icon: `mine_updateTel`, url: '../mine/updateTel' },
          { text: '解绑设备', icon: `mine_unbind`, url: '../mine/promptManage' }
        ],
        myOrderList: [{ status: 0, text: '待付款', icon: `mine_pendingPayment`, url: '../mine/myOrder' },
          { status: 1, text: '已完成', icon: `mine_complated`, url: '../mine/myOrder' }
        ],
        visibleDel: false,
        actionsDel: [{ 'name': '取消' }, { 'name': '删除', 'loading': false }],
        visibleDelSuc: false,
        visibleBreak: false,
        visibleBreakSuc: false,
      }
    },

    components: {viDialog},
    computed: {
      ...mapState('mine', [
        'myInfo'
      ])
    },
    methods: {
      ...mapActions('mine', [
        'setMyInfo',
        'getMyInfo',
      ]),
      ...mapActions([
        'logout',
      ]),

      delAccount() {
        this.visibleDel = true;
      },
      clickDel({ mp: { detail } }) {
        if (detail.index === 0) {
          this.visibleDel = false;
          this.visibleDelSuc = false;
        } else {
          const action = [...this.actionsDel]
          this.visibleDel = false;
          this.actionsDel = action;
          this.visibleDelSuc = true;
        }
      },
      iconDel() {
        let url = '../login/index';
        wx.navigateTo({ url });
      },
      gridClick(grid) {

        if (grid.text === '解绑设备') {
          this.visibleBreak = true;
        } else if (grid.status === 0 || grid.status === 1) {
          let url = grid.url + '?status=' + grid.status;
          wx.redirectTo({ url });
        } else {
          let url = grid.url;
          wx.navigateTo({ url });
        }
      },
      handleOk() {
        //触发事件？？？
        /*const action = [...this.actionsBreak];*/
        this.visibleBreak = false;
        /*this.actionsBreak = action;*/
        this.visibleBreakSuc = true;
      },
      handleCancel() {
        this.visibleBreak = false;
        this.visibleBreakSuc = false;
      },
      iconBreak() {
        this.visibleBreakSuc = false;
      }
    },
    mounted() {
      this.getMyInfo().then(data => {
        data && this.setMyInfo(data);
      });
    }

  }

</script>
<style lang="less">
  .mine-grid-item {
    padding: 0 !important;
  }

</style>
<style scoped lang="less">
  label {
    padding-bottom: 10px;
  }

  .myInfos {
    color: #3A3A3A;
    width: 100%;
    padding-top: 10px;
    background-color: #FFF;
    margin: 0 0 5px;
  }

  .myInfo-basic {
    font-size: 16px;
    width: 115px;
    display: inline-block !important;
    padding-left: 30px;
    padding-top: 35px;
    box-sizing: border-box;
    vertical-align: top;
  }

  .myInfo-basic-border {
    height: 115px;
    border-right: 2px solid #7B7B7B;
    padding-top: 10px;
  }

  .myInfo-other {
    display: inline-block !important;
    padding-left: 25px;
    padding-right: 30px;
    box-sizing: border-box;
  }

  .myInfo-other div {
    padding-bottom: 8px;
  }

  .myInfo-photo {
    width: 70px !important;
    height: 65px !important;
  }

  .myInfo-name {
    padding-left: 16px;
  }

  .btn-bar {
    font-size: 14px;
    padding-top: 15px;
    padding-bottom: 26px !important;
  }

  .btn-del {
    padding-right: 87px;
  }

  .delete-icon {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .del-info {
    font-size: 16px;
    color: #FFFFFF;
  }

  .order-panel {
    .panel-body {
      padding-top: 8px;
    }
  }

  .grid-list {
    padding: 5px 15px;
    font-size: 14px;
    border: none;
  }

  .modal-info {
    padding: 40px 32px;
  }

  .modal-status {
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 10px;
  }

  .modal-desinfo {
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }

</style>
