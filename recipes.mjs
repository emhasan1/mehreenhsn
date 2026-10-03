export function recipeFor(types){
 const set=new Set(types),has=x=>set.has(x),veg=['broccoli','carrot','mushroom','tomato'].some(has),protein=has('steak')||has('shrimp');
 const dish=(name,look,comment,bad=false)=>({name,look,comment,bad});
 if(has('chocolate')&&(protein||veg||has('cheese')))return dish('Cocoa catastrophe','disaster','The pan just filed a restraining order. Even the bin asked for a second opinion.',true);
 if(has('flour')&&!has('water')&&!has('egg'))return dish('Dry-wall special','disaster','Congratulations, you made building material. Michelin called. They want their tyres back.',true);
 if(has('flour')&&has('chocolate')&&has('egg'))return dish('Fudgy brownie','brownie','Okay, pastry chef. That middle is fudgier than your excuses for making another batch.');
 if(has('flour')&&has('egg')&&(has('cheese')||veg))return dish('Golden fritters','fritter','Crispy edges, soft middle. Annoyingly good. You may keep the apron.');
 if(has('flour')&&has('egg'))return dish('Golden pancakes','pancake','A proper stack. Brunch just cancelled its other plans.');
 if(has('flour')&&has('water'))return dish('Skillet flatbread','bread','Flour, water, confidence. Somehow you actually pulled it off.');
 if(has('steak')&&has('shrimp'))return dish('Surf & turf','steak','Two proteins, zero hesitation. This plate has a higher budget than the website.');
 if(has('steak'))return dish(veg?'Steak & greens':'Seared steak','steak','That sear has main-character energy. The vegetables are just happy to be invited.');
 if(has('shrimp'))return dish('Sizzling shrimp','shrimp','Tiny seafood. Massive comeback. Restaurant behaviour.');
 if(has('egg'))return dish(has('cheese')?'Cheesy omelette':veg?'Garden omelette':'Golden omelette','omelette','Fluffy, golden, and holding it together better than most group projects.');
 if(has('water')&&veg)return dish('Garden soup','soup','Actual soup. Not just wet vegetables with a LinkedIn profile. Respect.');
 if(veg)return dish('Skillet greens','greens','The vegetables survived your creative direction. And they look delicious.');
 if(has('chocolate'))return dish('Chocolate fondue','fondue','A pool of chocolate. Finally, a decision nobody needs to workshop.');
 if(has('cheese'))return dish('Crispy cheese','fritter','You fried cheese. A deeply unserious but absolutely correct decision.');
 return dish('Hot disappointment','soup','You boiled water and waited for applause. The kettle is suing for plagiarism.',true);
}
