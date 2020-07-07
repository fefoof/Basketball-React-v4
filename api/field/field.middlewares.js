const router = require('express').Router();
// Models
const Field = require('../../models/field');

const renderFieldForm = (req, res) => {
  console.log('renderFieldForm');
  res.render("fields/new-field");
};

//const createNewField = (req, res) => {
router.post('/', (req, res, next) => {
  const { idField,name,direction, phone } = req.body;
  const newField = new Field(idField,name,direction, phone);

  const errors = [];
  if (!idField) {  
    errors.push({ text: "Debe ingresar el Id de la Cancha." });
  }
  if (!name) {
    errors.push({ text: "Debe ingresar el nombre." });
  }
  if (!direction) {
    errors.push({ text: "Debe ingresar el direccion." });
  }
  if (!phone) {
    errors.push({ text: "Debe ingresar el telefono." });
  }
  if (errors.length > 0) {
    res.json({
      errors:errors,
      idField:idField,
      name:name,
      direction:direction,
      phone:phone
    });
  } else {

    newField.saveField()
      .then(fieldrBD => {
        res.json({fieldrBD});      
        
      })
      .catch(err => {
        next(err);  
      });  
  }
});

const updateField = (req, res, next) => {

  const {idField,name,direction, phone} = req.body;
  const newField = new Field(idField,name,direction, phone );

  newField.updateField()
    .then(fieldBD => {
      res.json({fieldBD}); 
    })
    .catch(err => {
      next(err);  
    }); 
};

/* const deleteField = async (req, res, next) => {
  Field.findByIdAndDelete(req.params.idField)
  .then(fieldBD => {
    res.json({fieldBD}); 
  })
  .catch(err => {
    next(err);  
  });      
};
 */

//const getAllFields = (req, res, next) => {
router.get('/', (req, res, next) => {
  Field.getAllFields()
  .then(listFields => {
      res.json({listFields});
  })
  .catch(err => {
      next(err);  
  });    
});

//const getFieldById = (req, res, next) => {
router.get('/:id', (req, res, next) => {  
  Field.getField(req.params.idField)
    .then(fieldBD => {
      res.json({fieldBD}); 
    })
    .catch(err => {
      next(err);  
    });     
});


module.exports = router;
