<template>
  <div class="page-header">
    <h1 class="page-title">说说</h1>
    <img
      class="page-cover"
      src="https://ik.imagekit.io/nicexl/Wallpaper/ba41a32b219e4b40ad055bbb52935896_Y0819msuI.jpg"
      alt=""
    />
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="page-container">
      <div class="title">基本信息</div>
      <div class="info-container">
        <user-avatar class="avatar"></user-avatar>
        <div class="info mt-4">
          <n-form
            ref="formInstRef"
            label-align="left"
            :label-width="80"
            :model="userForm"
            :rules="rules"
          >
            <n-form-item label="昵称" label-style="color: var(--text-color);" path="nickname">
              <n-input v-model:value="userForm.nickname" placeholder="输入您的昵称" />
            </n-form-item>
            <n-form-item label="个人网站" label-style="color: var(--text-color);" path="website">
              <n-input v-model:value="userForm.webSite" placeholder="请输入个人网站" />
            </n-form-item>
            <n-form-item label="简介" label-style="color: var(--text-color);" path="intro">
              <n-input v-model:value="userForm.intro" placeholder="介绍一下自己吧" />
            </n-form-item>
            <n-form-item label="邮箱" label-style="color: var(--text-color);" path="email">
              <n-input-group>
                <n-input v-model:value="user.email" placeholder="请输入邮箱" disabled></n-input>
                <n-button v-if="user.email" color="#49b1f5" @click="app.emailFlag = true">
                  修改邮箱
                </n-button>
                <n-button v-else color="#49b1f5" @click="app.emailFlag = true"> 绑定邮箱</n-button>
              </n-input-group>
            </n-form-item>
          </n-form>
          <n-button color="#3e999f" @click="handleUpdate"> 修改</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { updateUserInfo } from "@/api/user";
import { UserInfo } from "@/api/user/types";
import { useAppStore, useUserStore } from "@/store";
import { FormInst } from "naive-ui";

const user = useUserStore();
const app = useAppStore();
const formInstRef = ref<FormInst | null>(null);
const router = useRouter();
const rules = {
  nickname: {
    required: true,
    message: "昵称不能为空",
  },
};
const userForm = ref<UserInfo>({
  nickname: user.nickname,
  intro: user.intro,
  webSite: user.webSite,
});
const handleUpdate = () => {
  formInstRef.value?.validate((errors) => {
    if (!errors) {
      updateUserInfo(userForm.value).then((res) => {
        if (data.flag) {
          user.updateUserInfo(userForm.value);
          window.$message?.success("修改成功");
        }
      });
    }
  });
};
onMounted(() => {
  if (!user.id) {
    router.push("/");
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.title {
  font-size: 1.25rem;
  font-weight: 700;
}

.info-container {
  @include flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  .avatar {
    display: inline-flex;
    width: 230px;
    height: 140px;
  }

  .info {
    width: 530px;
  }
}

@media (max-width: 850px) {
  .avatar {
    justify-content: center;
  }
}
</style>
