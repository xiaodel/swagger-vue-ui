<template>
    <div class="components-test-info">
        <div class="info">
            <div class="line">
                <label class="label">title</label>
                <span class="value">{{swa.desc}}</span>
                <a-tag color="#f50" v-if="swa.info.deprecated" title="已过时，不赞成继续使用！">{{swa.info.deprecated?'已过时':''}}
                </a-tag>
            </div>
            <div class="line">
                <label class="label">url</label>
                <span class="value">{{swa.url}}</span>
            </div>
            <div class="line">
                <label class="label">type</label>
                <span class="value">{{swa.type}}</span>
            </div>
            <div class="line">
                <label class="label">consumes</label>
                <span class="value">{{swa.info.consumes}}</span>
            </div>
            <div class="line">
                <label class="label">produces</label>
                <span class="value">{{swa.info.produces}}</span>
            </div>
            <div class="line">
                <label class="label">desc</label>
                <span class="value">{{swa.desc}}</span>
            </div>

            <div class="line">
                <label class="label">请求参数</label>
                <div class="line">
                    <table v-if="swa.info.parameters && swa.info.parameters.length > 0"
                           class="table">
                        <thead class="thead">
                        <tr>
                            <td>参数名称</td>
                            <td>说明</td>
                            <td>参数类型</td>
                            <td>是否必须</td>
                            <td>类型</td>
                            <td>schema</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in swa.info.parameters">
                            <td>{{item.name}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.in}}</td>
                            <td>{{item.required}}</td>
                            <td>{{item.type || item.schema.type}}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="line">
                <label class="label">响应状态</label>
                <div class="line">
                    <table v-if="swa.info.responses"
                           class="table">
                        <thead class="thead">
                        <tr>
                            <td>状态码</td>
                            <td>说明</td>
                            <td>引用数据</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(value,name) in swa.info.responses" :key="name">
                            <td>{{name}}</td>
                            <td>{{value.description}}</td>
                            <td>{{value.schema}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import Tables from '@/components/Tables';

    export default {
        name: "TestInfo",
        components: {
            Tables
        },
        props: {
            swagger: Object
        },
        data() {
            return {
                swa: this.swagger,
                refList: [],
            }
        },
        computed: {
            ...mapState(['apiInfo']),
        },
        methods: {
            schemaRef(schema) {
                if (schema) {
                    let{$ref} = schema;
                    let m = $ref;
                    let name = m.split('#/definitions/')[1];
                    this.refList.push({title: name, refLink: schema});
                    console.error('refList', name)
                    console.error('swa.info.responses', this.swa.info.responses)
                    return name;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .components-test-info {
        .info {
            .line {
                margin: 0.5rem 0;

                .label {
                    margin-right: 1rem;
                    font-size: 1.1rem;
                    font-weight: 800;
                    display: inline-block;
                    width: 8rem;
                }

                .value {
                    font-size: 1.1rem;
                    color: #c7254e;
                }
            }

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
        }
    }
</style>