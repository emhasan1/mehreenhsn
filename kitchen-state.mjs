export const ingredients=[
 {id:'water',name:'Water',seconds:6,color:0x72cfe7,done:0x9fdae6},
 {id:'flour',name:'Flour',seconds:7,color:0xf4e9cc,done:0xc49c58},
 {id:'egg',name:'Egg',seconds:6,color:0xfff4da,done:0xe5b15b},
 {id:'chocolate',name:'Chocolate',seconds:5,color:0x673728,done:0x3d2018},
 {id:'broccoli',name:'Broccoli',seconds:7,color:0x429e3b,done:0x607f27},
 {id:'carrot',name:'Carrot',seconds:6,color:0xff8628,done:0xd26217},
 {id:'steak',name:'Steak',seconds:10,color:0xd75d68,done:0x864422},
 {id:'mushroom',name:'Mushroom',seconds:6,color:0xcbb39a,done:0x8b6039},
 {id:'tomato',name:'Tomato',seconds:5,color:0xef4d35,done:0xaf4422},
 {id:'shrimp',name:'Shrimp',seconds:7,color:0xe8c7af,done:0xf18553},
 {id:'cheese',name:'Cheese',seconds:5,color:0xffd45a,done:0xe3aa2c}
];
export class KitchenState{
 constructor(){this.items=[];this.burner=false;this.nextId=1;}
 add(type){const spec=ingredients.find(i=>i.id===type);if(!spec||this.items.length>=24)return null;const item={id:this.nextId++,type,progress:0,zone:'counter',cooked:false};this.items.push(item);return item;}
 move(item,zone){if(zone==='bowl'&&!item.cooked)return false;item.zone=zone;return true;}
 tick(seconds){if(!this.burner)return [];const ready=[];for(const item of this.items){if(item.zone!=='pan'||item.cooked)continue;item.progress=Math.min(1,item.progress+seconds/ingredients.find(s=>s.id===item.type).seconds);if(item.progress>=1){item.cooked=true;ready.push(item);}}return ready;}
 reset(){this.items=[];this.burner=false;}
}
