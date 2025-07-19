<template>
  <div class="login-wrapper">
    <div class="left-image-wrap">
      <!--      <img src="../../assets/images/login/system-title.png" alt="logo" />-->
    </div>
    <div class="update-password-wrap" v-if="isForceUpdatePassword">
      <a-card title="修改密码">
        <update-password
          :userName="loginInfo.userName"
          :isForceUpdate="isForceUpdatePassword"
          :code="loginInfo.code"
          :uuid="loginInfo.uuid"
          :reloadLogin="reloadLogin"
        />
      </a-card>
    </div>
    <div class="form-wrap" v-else>
      <div class="form-sub-wrap">
        <div class="title-wrap">
          <p class="title-text">后台业务管理系统</p>
        </div>
        <a-form :label-col="labelCol">
          <a-form-item has-feedback v-bind="validateInfos.userName">
            <a-input v-model:value="loginInfo.userName" placeholder="请输入用户名" @keyup.enter="loginSubmit">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback v-bind="validateInfos.passWord">
            <a-input
              v-model:value="loginInfo.passWord"
              type="password"
              placeholder="请输入密码"
              @keyup.enter="loginSubmit"
            >
              <template #prefix>
                <UnlockOutlined />
              </template>
            </a-input>
          </a-form-item>
          <!--          <a-form-item name="code" v-bind="validateInfos.code">-->
          <!--            <a-row type="flex" justify="space-between" align="middle">-->
          <!--              <a-col :span="16">-->
          <!--                <a-input v-model:value="loginInfo.code" placeholder="请输入校验码" @keyup.enter="loginSubmit">-->
          <!--                  <template #prefix>-->
          <!--                    <UnlockOutlined />-->
          <!--                  </template>-->
          <!--                </a-input>-->
          <!--              </a-col>-->
          <!--              <a-col :span="6">-->
          <!--                <div class="login-code">-->
          <!--                  <img :src="codeUrl" @click="getCode" class="login-code-img" />-->
          <!--                </div>-->
          <!--              </a-col>-->
          <!--            </a-row>-->
          <!--          </a-form-item>-->
          <a-form-item>
            <a-button type="primary" @click.prevent="loginSubmit" :loading="loginLoading" block>登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { Form } from 'ant-design-vue'
import { UserOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import { loginRules } from '@/validator/login'
import { apiGetCodeImage, apiSubmitLogin } from '@/service/api/login'
import { useAppStore } from '@/store/modules/app'
import UpdatePassword from '@/components/userCenter/UpdatePassword.vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore()

const router = useRouter()

const labelCol = { span: 0 }

const loginInfo = reactive({
  userName: '',
  passWord: '',
  code: '',
  uuid: '',
})

const codeUrl = ref<string>('')

const loginLoading = ref<boolean>(false)

const isForceUpdatePassword = ref<boolean>(false)

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(loginInfo, loginRules)

onMounted(async () => {
  // await getCode()
})

const getCode = async () => {
  const { code, data } = await apiGetCodeImage()
  if (code === 20000) {
    codeUrl.value = 'data:image/gif;base64,' + data.img
    loginInfo.uuid = data.uuid
  }
}

const loginSubmit = async () => {
  // appStore.token =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6bnVsbCwibG9naW5fdXNlcl9rZXkiOiIyOGUyOTY0ZS02MTAzLTQ1MzMtYjM3Ny0yNmU1MDhmOGE4NzcifQ.ZqBbOuy-TbJMyoA3DVF2wgfON3Bn_K99rdrnOFr5IH9aZpO1wG8r5MkNFetZAGi6X2PBKp43aeQ_bzqMG4oSvw'
  // // await appStore.GetUserInfo()
  // await appStore.GetRoutersInfo()
  // const currentRoute = router.getRoutes().filter((val: any) => val.meta.level === 1)
  // const routerName = currentRoute[0].name
  // router.replace({ name: routerName })
  validate().then(async () => {
    loginLoading.value = true
    const { code, data } = await apiSubmitLogin({
      username: loginInfo.userName,
      password: loginInfo.passWord,
    })
    loginLoading.value = false
    if (code === 20001) {
      appStore.token = data
      await appStore.GetUserInfo(loginInfo.userName)
      await appStore.GetRoutersInfo()
      const currentRoute = router.getRoutes().filter((val: any) => val.meta.level === 1)
      console.log(currentRoute)
      const routerName = currentRoute[0].name
      router.replace({ name: routerName })
    }
    // else if (code === 40010 || code === 40011) {
    //   isForceUpdatePassword.value = true
    // } else {
    //   getCode()
    // }
  })
}

const reloadLogin = () => {
  resetFields()
  // getCode()
  isForceUpdatePassword.value = false
}
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6fcff;
  .left-image-wrap {
    flex: 1;
    height: 100%;
    background-image: url(../../assets/images/login/login-left-img.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    img {
      width: 50%;
      height: 69px;
      margin-top: 16%;
    }
  }
  .form-wrap {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-sub-wrap {
      min-width: 428px;
      padding: 65px 49px;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 0px 54px 0px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      .title-wrap {
        margin-bottom: 44px;
        p {
          margin: 0;
        }
        .title-text {
          font-size: 26px;
          font-family: Source Han Sans CN;
          font-weight: 400;
        }
        .subtitle-text {
          margin-top: 7px;
          font-size: 11px;
          font-family: Arial;
          font-weight: 400;
          color: #b5b5b5;
        }
      }
      .login-tip {
        font-size: 13px;
        text-align: center;
        color: #bfbfbf;
      }
      .login-code {
        height: 32px;
        .login-code-img {
          height: 32px;
          cursor: pointer;
        }
      }
    }
  }
  .update-password-wrap {
    width: 428px;
    margin: 0 10% 0 5%;
    border-radius: 10px;
    background: #ffffff;
    overflow: hidden;
  }
}
</style>
