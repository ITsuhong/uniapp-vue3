<template>
  <!-- status: 请求时设置为 loading，请求后判断current * pageSize < total还有数据 有设置为loadmore，无设置为nomore -->
  <u-loadmore
    :status="loading ? 'loading' : pagination.current * pagination.pageSize < pagination.total ? 'loadmore' : 'nomore'"
  ></u-loadmore>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  }
};
</script>

<style></style>
