<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/pokemon">Pokemon List</router-link> |
      <router-link to="/card">Pokemon Card</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #5538bb;
}

.is-header {
    background: #167df0 !important;
    color: white !important;
    
}
.table tr.is-selected {
    background-color: hsl(219, 70%, 96%);
    color: #003087;
}

tr > th[class=''],
tr > td[data-label='']
{
  border:none;
  background-color: #fff !important;
  border-color: #fff !important;
}

::marker {
   color : #fff;
}

ul.pagination-list {
    margin: 0  !important;

}

tr > td[data-label='']
{
   visibility: hidden !important;
}

tr.is-selected > td[data-label='']
{
   visibility: visible !important;
}

tr.is-selected .fas {
    color: #0f0f0e !important;
}
 
 span.menu {
  color:#003087 !important;
}

span.menu:hover {
  color:#fba300 !important;
}

.navbar-link, a.navbar-item {
    cursor: pointer;
    color: #fba300 !important;
}

a.navbar-item:hover{
  background-color: #ffffff !important;
}

.table tr.is-selected {
    background-color: #505050 !important;
    
}

</style>
