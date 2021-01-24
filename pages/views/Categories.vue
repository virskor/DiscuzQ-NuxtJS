<template>
  <div>
    <AppTitle showExtendedNav title="版块分类">
      <ThreadsFiltersMenu v-if="$C.isMobile()" />
    </AppTitle>
    <v-container>
      <CategoriesTab />
    </v-container>
  </div>
</template>

<script>
import CategoriesTab from "~/components/categories/CategoriesTab";
import ThreadsFiltersMenu from "~/components/threads/ThreadsFiltersMenu";

export default {
  asyncData({ app }) {
    app.head.title = "版块分类";
  },
  head() {
    return {
      title: "分类",
    };
  },
  components: {
    CategoriesTab,
    ThreadsFiltersMenu,
  },
};
</script>
