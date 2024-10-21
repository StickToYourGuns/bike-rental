<template>
    <nav>
        <a @click="this.$router.push('/theft')">Back</a>
        <a @click="this.$router.push('/')">Home</a>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

nav a{
    font-size: 40px;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px;
    background: var(--dark2);
    border-radius: 5px;
}
nav a:hover{
    background: var(--dark3);
}</style>