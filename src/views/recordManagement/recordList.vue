<template>
  <div class="recordList">
    <div style="padding:5px 0;">
        <el-button type="primary" @click="addItem">添加</el-button>
    </div>
    <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
            prop="name"
            label="记录名称"
            width="250">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
            width="300">
        </el-table-column>
        <el-table-column
            prop="contact"
            label="内容"
            width="300">
        </el-table-column>
        <el-table-column
            prop="statusBoolean"
            label="状态"
            width="250">
            <template slot-scope="scope">
                <el-switch
                    disabled
                    v-model="scope.row.statusBoolean"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button @click="editItem(scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="详情" :visible.sync="detailDialogVisible" :close-on-click-modal="false">
        <el-form ref="form" class="detail-form" label-width="100px">
            <el-form-item label="id">
                {{ detailData.id }}
            </el-form-item>
            <el-form-item label="记录名称">
                {{ detailData.name }}
            </el-form-item>
            <el-form-item label="描述">
                {{ detailData.description }}
            </el-form-item>
            <el-form-item label="内容">
                {{ detailData.contact }}
            </el-form-item>
            <el-form-item label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="detailData.statusBoolean"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-form-item>
            <el-form-item label="创建时间">
                {{ detailData.time }}
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form ref="form" label-width="100px">
            <el-form-item label="记录名称">
                <el-input v-model="addItemData.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="addItemData.description"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="addItemData.contact"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="addItemData.statusBoolean"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="confirmAddDialog">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editDialogVisible" :close-on-click-modal="false">
        <el-form ref="form" label-width="100px">
            <el-form-item label="记录名称">
                <el-input v-model="editItemData.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="editItemData.description"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="editItemData.contact"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="editItemData.statusBoolean"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="confirmEditDialog">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
export default {
    data() {
        return {
            tableData: [],
            detailDialogVisible: false,
            addDialogVisible: false,
            editDialogVisible: false,
            detailData: {}, // 显示的数据
            addItemData: {}, // 添加的数据
            editItemData: {}, // 修改的数据
        };
    },
    methods: {
        //弹出查看对话框
        showDetail(item) {
            this.detailData = item;
            this.detailData.status = item.status === '1' ? true : false;
            this.detailDialogVisible = true;
        },
        //关闭对话框
        closeDialog() {
            this.addDialogVisible = false;
            this.editDialogVisible = false;
            this.addItemData = {};
            this.editItemData = {};
        },
        //添加数据，请求后端接口
        confirmAddDialog() {
            this.$http.post('/add', {
                name: this.addItemData.name,
                description: this.addItemData.description,
                contact: this.addItemData.contact,
                status: this.addItemData.statusBoolean === true ? '1' : '0'
            }).then( res => {
                if (res.data.msg === 'ok') {
                    this.addDialogVisible = false;
                    this.addItemData = {};
                    this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                    });
                    this.getRecordList();
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg || '服务器出错',
                        type: 'error'
                    });
                }
            });
        },
        //修改数据，请求后端接口
        confirmEditDialog() {
            this.$http.post(`/update/${this.editItemData.id}`, {
                name: this.editItemData.name,
                description: this.editItemData.description,
                contact: this.editItemData.contact,
                status: this.editItemData.statusBoolean === true ? '1' : '0'
            }).then( res => {
                if (res.data.msg === 'ok') {
                    this.editDialogVisible = false;
                    this.editItemData = {};
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getRecordList();
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg || '服务器出错',
                        type: 'error'
                    });
                }
            });
        },
        //弹出修改对话框
        editItem(item) {
            this.editItemData = Object.assign({}, item);
            this.editDialogVisible = true;
        },
        //弹出添加对话框
        addItem() {
            this.addItemData = {
                name: '',
                description: '',
                contact: '',
                status: '',
                statusBoolean: true
            };
            this.addDialogVisible = true;
        },
        //删除数据，请求后端接口
        deleteRow(item) {
            this.$confirm('确定删除吗？').then(_ => {
                this.$http.post(`/delete/${item.id}`).then( res => {
                    if (res.data.msg === 'ok') {
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getRecordList();
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg || '服务器出错',
                            type: 'error'
                        });
                    }
                });
            });
        },
        formatStatus(status) {
            return status === '1' ? true : false;
        },
        //获取列表数据，请求后端接口
        getRecordList() {
            this.$http(`/list`).then(res => {
                if (res.status === 200) {
                    res.data.list.forEach(item => {
                        item.statusBoolean = this.formatStatus(item.status);
                        item.time = moment(item.create_at).format('YYYY-MM HH:mm');
                    });

                    this.tableData = res.data.list;
                } else {
                    alert('请求出错')
                }
            });
        },
        change() {
        }
    },
    async mounted() {
        await this.getRecordList();
    }
};
</script>

<style lang="less">
.detail-form {
    .el-form-item {
        border: 1px solid #dfe6ec;
        border-bottom: none;
        margin-bottom: 0;
        .el-form-item__content {
            border-left: 1px solid #dfe6ec;
        }
        .el-form-item__content,
        .el-form-item__label {
            display: block;
            padding: 10px 10px;
            line-height: 20px;
        }
        &:last-child {
            border-bottom: 1px solid #dfe6ec;
        }
    }
}
</style>