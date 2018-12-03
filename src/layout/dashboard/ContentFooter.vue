<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="http://www.google.com">
            ADC - eCard
          </a>
        </li>
      </ul>
      <div class="copyright">
        © {{year}} made by ADC lab
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: 2018
      }
    }
  };
</script>
<style>
</style>
