const db = require('./models');
// Get a reference to a toy
// db.pet.findOrCreate({
  //     where: {
  //         name: 'Silly May',
  //         species: 'Mini Aussie'
  //     },
  //     defaults: {
  //         userId: 1
  //     }
  // }).then(([pet, created]) => {
  //     // Get a reference to a toy
  //     db.toy.findOrCreate({
  //         where: {
  //             type: 'stinky bear',
  //             color: 'brown'
  //         }
  //     }).then(([toy, created]) => {
  //         // use the "addModel" method to attach one model to another model.
  //         pet.addToy(toy).then(relation => {
  //             console.log(`🦊 ${toy.type} added to ${pet.name}`)
  //             console.log(relation)
  //         })
  //     })
  // })

//   db.deck_comment.findOrCreate({
//         where: {
//             deckId: 1
//         },
//         defaults: {
//             userId: 3,
//             comment: "this is the comment"
//         }
//     }).then(([deck_comment, created]) => {
//         // user is an obj, created is a boolean
//         console.log(`Comment ${deck_comment.id} was ${created ? 'created' : 'found'} ${deck_comment.comment}`);
//         process.exit();
//     }).catch(err => {
//         console.log('🐻 Bad news bears, there be an error');
//         console.log(err);
//     });

db.pet.findOrCreate({
        where: {
            name: 'Silly May',
            species: 'Mini Aussie'
        },
        defaults: {
            userId: 1
        }
    }).then(([pet, created]) => {
        // Get a reference to a toy
        db.toy.findOrCreate({
            where: {
                type: 'stinky bear',
                color: 'brown'
            }
        }).then(([toy, created]) => {
            // use the "addModel" method to attach one model to another model.
            pet.addToy(toy).then(relation => {
                console.log(`🦊 ${toy.type} added to ${pet.name}`)
                console.log(relation)
            })
        })
    })

