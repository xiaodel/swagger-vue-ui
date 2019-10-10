<template>
    <div>
        <div v-for="tab in tableList" :key="tab.title">
            <div class="title">{{tab.title}}</div>
            <div>
                <table class="table">
                    <thead class="thead">
                    <tr>
                        <td>参数名称</td>
                        <td>描述</td>
                        <td>数据类型</td>
                        <td>引用数据</td>
                    </tr>
                    </thead>
                    <tbody>
<!--                    <tr v-for="(value,name) in definitions(tab.ref)">-->
<!--                        <td>{{name}}</td>-->
<!--                        <td>{{value.description}}</td>-->
<!--                        <td>{{value.type}}</td>-->
<!--                        <td>{{schemaRef(value.$ref)}}</td>-->
<!--                    </tr>-->
                    </tbody>
                </table>
                {{tableList}}
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex';

    export default {
        name: "Tables",
        props: {
            tables: Array,
        },
        data() {
            return {
                tableList: this.tables,
            }
        },
        computed: {
            ...mapState(['apiInfo']),
            definitions() {
                return function (ref) {
                    if (ref) {
                        let arr = ref.$ref.split('#/definitions/');
                        let name = arr[arr.length - 1];
                        console.log('properties',this.apiInfo.definitions[name].properties);
                        return this.apiInfo.definitions[name].properties;
                    }
                    return '';
                }

            }
        },
        methods: {
            schemaRef(schema) {
                if (schema) {
                    let name = schema.split('#/definitions/')[1];
                    this.$set(this.tableList, this.tableList.length, {title: name, ref: schema});
                    console.error('schemaRef',this.tableList)

                    return name;
                }
            }
        }
    }
</script>

<style scoped lang="less">

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
                color: @global-text-color-1;
            }
        }
    }
</style>