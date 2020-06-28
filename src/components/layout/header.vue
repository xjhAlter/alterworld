<template>
  <header>
    <div class="header">
      <div class="header-main">
        <div class="header-left">
          <router-link class="header-logo" :to="'/'">
            <img class="header-logo-img" src="../../assets/logo.png" alt="Alter World"/>
          </router-link>
          <ul class="header-menu">
            <li class="header-menu-main" v-for="(menu, index) in mainMenu" :key="index">
              <router-link class="menu-name" :to="{name: menu.alias}" v-if="(!menu.children || menu.children.length===0) && (!menu.needAdmin)">
                {{menu.name}}
              </router-link>
              <div class="menu-name" :class="{'expanded': menu._hover}"
                   @mouseenter="onMenuEnter(menu)" @mouseleave="onMenuLeave(menu)"
                   v-else-if="!menu.needAdmin">
                {{menu.name}}
                <ul class="sub-menu-wrapper">
                  <li v-for="subMenu in menu.children" :key="subMenu.name"
                      @click="onMenuLeave(menu)">
                    <router-link class="sub-menu" :to="{name: subMenu.alias}">
                      {{subMenu.name}}
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="notice-msg" v-if="noticeMsg">
      <div class="notice-content flex-center">
        <div v-html="noticeMsg"></div>
      </div>
    </div>
  </header>
</template>

<script>
import menu from './menu'
export default {
  name: 'myHeader',
  data () {
    return {
      mainMenu: menu,
      noticeMsg: ''
    }
  },
  created () {
    this.$set(this, 'noticeMsg', `<p style="color:red">施工中</p>`)
  },
  methods: {
    /**
     * 鼠标进入在菜单上
     * @param menu
     */
    onMenuEnter (menu) {
      this.$set(menu, '_hover', true)
    },

    /**
     * 鼠标从菜单上离开
     * @param menu
     */
    onMenuLeave (menu) {
      this.$set(menu, '_hover', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    margin-bottom: 20px;

    .header {
      * {
        line-height: 1;
      }

      width: 100%;
      background-color: #282828;

      .header-main {
        position: relative;
        width: 1200px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-left, .header-right {
          display: flex;
          align-items: center;
          color: #ffffff;
          font-size: 14px;

          .header-logo {
            cursor: pointer;
            display: flex;
            width: 165.5px;
            height: 49px;
            font-size: 12px;

            .header-logo-img {
              width: 50px;
              height: 50px;
            }
          }

          .header-menu {
            margin: 0;
            padding: 0;
            white-space: nowrap;

            .header-menu-main {
              display: inline-block;

              .menu-name {
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 70px;
                transition: all .3s ease;

                &:hover {
                  background-color: #fff;
                  color: #409eff;
                }

                &.expanded {
                  .sub-menu-wrapper {
                    visibility: visible;
                  }
                }

                .sub-menu-wrapper {
                  margin: 0;
                  padding: 14px 0;
                  width: 322px;
                  display: flex;
                  flex-wrap: wrap;
                  list-style: none;
                  visibility: hidden;
                  position: absolute;
                  top: 100%;
                  left: 0;
                  background-color: #fff;
                  z-index: 9999;
                  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);

                  > li {
                    &:nth-child(2n+1) {
                      border-right: #e8e8e8 solid 1px;
                    }

                    .sub-menu {
                      display: flex;
                      align-items: center;
                      padding-left: 28px;
                      width: 160px;
                      height: 46px;
                      color: #333;

                      &:hover {
                        color: #409eff;
                        background-color: #f2f4f5;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .header-right {
          height: 70px;
          justify-content: flex-end;
        }
      }
    }

    .notice-msg {
      margin-top: 10px;

      .notice-content {
        font-size: 14px;
        margin: 0 auto;
        width: 1200px;
        padding: 10px 20px;
        background-color: #fdf6ec;
      }
    }
  }
</style>
