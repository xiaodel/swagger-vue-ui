<template>
    <div class="components-api-info">
        <div>
            <table class="table" v-if="apiInfo.info">
                <thead class="thead">
                <tr>
                    <td colspan="2">{{apiInfo.info.title}}</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>简介</td>
                    <td>{{apiInfo.info.description}}</td>
                </tr>
                <tr>
                    <td>作者</td>
                    <td>{{apiInfo.info.contact.name}}</td>
                </tr>
                <tr>
                    <td>版本</td>
                    <td>{{apiInfo.info.version}}</td>
                </tr>
                <tr>
                    <td>host</td>
                    <td>{{apiInfo.host}}</td>
                </tr>
                <tr>
                    <td>basePath</td>
                    <td>{{apiInfo.basePath}}</td>
                </tr>
                <tr>
                    <td>服务url</td>
                    <td>{{apiInfo.info.termsOfService}}</td>
                </tr>
                <tr>
                    <td>分组名称</td>
                    <td>{{apiInfo.name}}</td>
                </tr>
                <tr>
                    <td>分组url</td>
                    <td>{{apiInfo.info.description}}</td>
                </tr>
                <tr>
                    <td>分组location</td>
                    <td>{{apiInfo.location}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: "ApiInfo",
        computed: {
            ...mapState(['apiInfo']),
        },

    }
</script>

<style scoped lang="less">
    .components-api-info {
        .table {
            width: 100%;
            border: 1px solid @global-border-color-1;

            .thead {
                text-align: center;
                font-weight: 700;
            }

            tr {

                td {
                    padding: 0.5rem;
                    border: 1px solid @global-border-color-1;
                }
            }
        }
    }
</style>