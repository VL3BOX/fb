<template>
    <div class="m-skill-item-call">
        <!-- 调用函数名 -->
        <b>{{ call.call }}</b>

        <!-- 参数列表 -->
        <span>(</span>
        <span class="u-call-arg" v-for="(arg, i) in call.args" :key="i">
            <template v-if="arg.type == 'MemberExpression'">
                <em>{{ arg.base.name }}{{ arg.indexer }}{{ arg.identifier.name }}</em>
            </template>
            <template v-else-if="arg.type == 'NumericLiteral'">
                <em>{{ arg.value }}</em>
            </template>
            <template v-else-if="arg.type == 'Identifier'">
                <em>{{ arg.name }}</em>
            </template>
            <template v-else-if="arg.type == 'StringLiteral'">
                <em>{{ arg.raw }}</em>
            </template>
            <template v-else-if="arg.type == 'BinaryExpression'">
                <em>{{ arg.left.raw || arg.left.name }}{{ arg.operator }}{{ arg.right.raw || arg.right.name }}</em>
            </template>
            <template v-else-if="arg.type == 'UnaryExpression'">
                <em>{{ arg.operator }}{{ arg.argument.raw || arg.argument.name}}</em>
            </template>
            <template v-else>{{ arg }}</template>
            <em v-if="i < call.args.length - 1">,</em>
        </span>
        <span>)</span>
    </div>
</template>

<script>
export default {
    name: "skill_item_call",
    props: ["data"],
    data: function() {
        return {};
    },
    computed: {
        call: function() {
            return this.data;
        },
    },
    methods: {},
    mounted: function() {},
    components: {},
};
</script>
