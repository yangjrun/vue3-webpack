<template>
  <div>
    首页
    <home></home>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import home from './views/home';
interface DataProps {}
export default {
  name: '',
  components: {
    home
  },
  setup() {
    console.log('1-开始创建组件-setup');
    const data: DataProps = reactive({});
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount');
    });
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted');
    });
    const refData = toRefs(data);
    return {
      ...refData
    };
  }
};
</script>
<style lang="scss" scoped></style>
