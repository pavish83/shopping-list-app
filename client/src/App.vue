<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Inter";
  font-weight: 400;
  font-size: 15px;
  font-style: normal;
  unicode-range: U+000-5FF;
  src: local("Inter"), url("../public/fonts/Inter-Regular.woff2") format("woff2"), url("../public/fonts/Inter-Regular.woff") format("woff");
}
@font-face {
  font-family: "Montserrat Alternates";
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  unicode-range: U+000-5FF;
  src: local("Montserrat Alternates"), url("../public/fonts/MontserratAlternates-Bold.woff") format("woff");
}
:root {
  --orange-color: #FF941A;
  --main-color: #585666;
  --gray-color: #B1B0B8;
  --border-color: #E3E3E6;
}
// html {
//   &:after {
//     position: absolute;
//     left: 0;
//     top: 100%;
//     height: 1px;
//     background: var(--border-color);
//     content: "";
//     width: 100%;
//     display: block;
//   }
// }
#app {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  margin: 0px auto;
  color: var(--main-color);
  max-width: 800px;
  padding: 0 20px;
}
.shopping-list-title {
  font-family: 'Montserrat Alternates';
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin: 112px 0 65px 0;
}
</style>
