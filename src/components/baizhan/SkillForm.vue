<template>
    <el-dialog class="m-skill-dialog" :visible.sync="show" :title="title" :before-close="close">
        <el-form class="m-skill-form" ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item :label="$t('技能等级')" prop="level">
                <el-select v-model="form.level" :placeholder="$t('请选择技能重数')" style="width: 100%">
                    <el-option v-for="item in maxLevel" :key="item" :value="item" :label="$t('第') + ` ${item} ` + $t('重')"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('技能CD')" prop="cooldown" style="width: 100%">
                <el-select v-model="form.cooldown" :placeholder="$t('请选择技能CD')">
                    <el-option :value="60" :label="$t('三级 - 60秒')"></el-option>
                    <el-option :value="30" :label="$t('二级 - 30秒')"></el-option>
                    <el-option :value="10" :label="$t('一级 - 10秒')"></el-option>
                    <el-option :value="0" :label="$t('被动技能')"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('伤害')" prop="damage">
                <el-input v-model="form.damage" :placeholder="$t('请填写伤害数值')" />
            </el-form-item>
            <el-form-item :label="$t('精力消耗')" prop="cost_vigor">
                <el-input v-model="form.cost_vigor" :placeholder="$t('请填写精力消耗')" />
            </el-form-item>
            <el-form-item :label="$t('耐力消耗')" prop="cost_endurance">
                <el-input v-model="form.cost_endurance" :placeholder="$t('请填写耐力消耗')" />
            </el-form-item>
            <el-form-item :label="$t('精力打击')" prop="hit_vigor">
                <el-input v-model="form.hit_vigor" :placeholder="$t('请填写精力打击')" />
            </el-form-item>
            <el-form-item :label="$t('耐力打击')" prop="hit_endurance">
                <el-input v-model="form.hit_endurance" :placeholder="$t('请填写耐力打击')" />
            </el-form-item>
            <el-form-item :label="$t('攻略链接')" prop="link">
                <el-input v-model="form.link" :placeholder="$t('请填写攻略链接')" />
            </el-form-item>
            <el-form-item :label="$t('备注')" prop="remarks">
                <el-input type="textarea" v-model="form.remarks" :placeholder="$t('请填写备注')" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">{{ $t('取消') }}</el-button>
                <el-button type="primary" :loading="loading" @click="submitForm()">{{ $t('确定') }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { addSkillInfo } from "@/service/baizhan";
import { cloneDeep } from "lodash";

const form = {
    user_id: 0,
    skill_id: 0,
    level: 5,
    cooldown: 0,
    damage: 0,
    cost_vigor: 0,
    cost_endurance: 0,
    hit_vigor: 0,
    hit_endurance: 0,
    link: "",
    remarks: "",
};

export default {
    name: "SkillForm",
    props: ["staged"],
    data: () => ({
        show: false,
        loading: false,
        form: cloneDeep(form),
        rules: {},
    }),
    computed: {
        maxLevel() {
            return ~~this.staged?.InSkill?.MaxLevel || 5;
        },
        title() {
            return `百战技能数据维护/${this.staged.szSkillName}/${this.staged.szBossName}`;
        },
    },
    watch: {
        visible: {
            immediate: true,
            handler: function (val) {
                this.show = val;
            },
        },
    },
    methods: {
        open(addon) {
            this.form = {
                ...form,
                ...addon,
            };
            this.show = true;
        },
        // 关闭
        close() {
            this.show = false;
            this.$refs.form.resetFields();
        },
        submitForm() {
            this.$refs.form.validate((valid, fields) => {
                if (valid) {
                    this.edit();
                } else {
                    console.log("error submit!!!", fields);
                }
            });
        },
        // 编辑
        edit() {
            if (this.loading) return;
            this.loading = true;
            addSkillInfo(this.form)
                .then((res) => {
                    this.$notify({
                        type: "success",
                        message: "修改成功!",
                    });
                    const { data } = res.data || {};
                    this.$emit("update", data);
                })
                .finally(() => {
                    this.loading = false;
                    this.close();
                });
        },
    },
};
</script>
