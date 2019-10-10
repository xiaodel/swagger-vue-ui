<template>
    <div class="components-header">
        <div class="header">
            <div class="left">
                <img src="">
                <h1>swagger-vue-ui</h1>
            </div>
            <div class="right">
                <a class="link" target="_blank" title="swagger注解使用教程"
                   href="https://github.com/swagger-api/swagger-core/wiki/Annotations-1.5.X#quick-annotation-overview">Swagger注解</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
    }
</script>

<style scoped lang="less">
    .components-header {
        height: 5vh;
        background-color: @global-brand-color;
        color: @global-basics-color-2;

        .header {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 2rem;

            .left {
                display: flex;
                align-items: center;
            }

            h1 {
                margin: 0;
                font-size: 1.5rem;
            }

            .right {
                display: flex;
                align-items: center;

                .link {
                    color: @global-basics-color-2;
                }
            }
        }
    }
</style>
