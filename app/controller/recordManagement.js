const recordManagement = require('../service/recordManagement.js')


const list = async (ctx) => {
  const list = await recordManagement.getList();
  ctx.body = {
    list
  };
};
const destroy = async (ctx) => {
  const { id } = ctx.params;
  await recordManagement.deletes(id);
  ctx.body = {
    msg: 'ok'
  };
};
const update = async (ctx) => {
  const { name, description, contact, status } = ctx.request.body;
  const { id } = ctx.params;
  await recordManagement.update(id, name, description, contact, status);
  ctx.body = {
    msg: 'ok'
  };
};
const create = async (ctx) => {
  const { name, description, contact, status } = ctx.request.body;
  await recordManagement.create(name, description, contact, status);
  ctx.body = {
    msg: 'ok'
  };
}

module.exports = {
  list,
  destroy,
  update,
  create,
}
