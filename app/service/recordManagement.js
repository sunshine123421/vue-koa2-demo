const recordManagement=require('../model/recordManagement.js')

//获取所有数据
const getList= async=> {
    const recordManagementList= recordManagement.findAll({
        attributes: { exclude: ['content'] },
        /*where: {
          status: {
            $ne: 0
          }
        },*/
        order: [
          ['id', 'desc']
        ]
      });
      return recordManagementList;
};

//删除
const deletes= async(id)=> {
  return recordManagement.destroy({
    where: { id }
  });
}

//更新
const update=async(id,name,description,contact,status)=>{
  return recordManagement.update({
    name: name,
    description: description,
    contact: contact,
    status: status
  }, {
    where: { id }
  });
}

//插入数据
const create=async(name,description,contact,status)=> {
    return recordManagement.create({
      name,
      description,
      contact,
      status
    });
};
  module.exports={
    getList,
    deletes,
    update,
    create,
  }