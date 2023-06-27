<template>
    <el-dialog class="m-skill-dialog" :visible.sync="show" :title="title" :before-close="close" draggable>
        <el-form class="m-skill-form" ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="技能等级" prop="level">
                <el-select v-model="form.level" placeholder="请选择技能等级" style="width: 100%">
                    <el-option v-for="item in maxLevel" :key="item" :value="item" :label="`${item}级`"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="技能CD" prop="cooldown">
                <el-input v-model="form.cooldown" placeholder="请填写技能CD" />
            </el-form-item>
            <el-form-item label="精力消耗" prop="cost_vigor">
                <el-input v-model="form.cost_vigor" placeholder="请填写精力消耗" />
            </el-form-item>
            <el-form-item label="耐力消耗" prop="cost_endurance">
                <el-input v-model="form.cost_endurance" placeholder="请填写耐力消耗" />
            </el-form-item>
            <el-form-item label="精力打击" prop="hit_vigor">
                <el-input v-model="form.hit_vigor" placeholder="请填写精力打击" />
            </el-form-item>
            <el-form-item label="耐力打击" prop="hit_endurance">
                <el-input v-model="form.hit_endurance" placeholder="请填写耐力打击" />
            </el-form-item>
            <el-form-item label="攻略链接" prop="link">
                <el-input v-model="form.link" placeholder="请填写攻略链接" />
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" v-model="form.remarks" placeholder="请填写备注" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" :loading="loading" @click="submitForm()">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { addSkillInfo } from "@/service/baizhan";
import { pick, cloneDeep } from "lodash";
import { removeEmptyIncludeZero } from "@/utils";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "SkillForm",
    props: ["visible", "staged"],
    data: function () {
        return {
            loading: false,
            form: {
                user_id: 0,
                skill_id: 0,
                level: null,
                cooldown: null,
                cost_vigor: null,
                cost_endurance: null,
                hit_vigor: null,
                hit_endurance: null,
                link: "",
                remarks: "",
            },
            rules: {},
        };
    },
    computed: {
        title() {
            return "百战技能编辑";
        },
        maxLevel() {
            return ~~this.staged?.InSkill?.MaxLevel || 5;
        },
    },
    watch: {
        staged: {
            immediate: true,
            handler: function (obj) {
                this.form = {
                    ...this.form,
                    ...obj,
                    ...obj.extra,
                    skill_id: obj.dwInSkillID,
                    user_id: ~~User.getInfo().uid,
                };
            },
        },
        visible: {
            immediate: true,
            handler: function (val) {
                this.show = val;
            },
        },
    },
    methods: {
        // 关闭
        close() {
            this.show = false;
            this.$refs.form.resetFields();
            this.$emit("close");
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
            const data = removeEmptyIncludeZero(cloneDeep(this.form));
            const form = pick(data, [
                "user_id",
                "skill_id",
                "level",
                "cooldown",
                "cost_vigor",
                "cost_endurance",
                "hit_vigor",
                "hit_endurance",
                "link",
                "remarks",
            ]);
            this.loading = true;
            addSkillInfo(form)
                .then(() => {
                    this.$notify({
                        type: "success",
                        message: "修改成功!",
                    });
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
