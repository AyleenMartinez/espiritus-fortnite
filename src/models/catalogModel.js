import { SPRITES } from "../data/sprites.js";
import { VARIANTS, VARIANT_ORDER, STATUS } from "../data/variants.js";
import { normalizeText } from "../utils/textUtils.js";

export function getCatalog() {
  return SPRITES.map(sprite => {
    const variants = sprite.variants
      .map(item => buildVariant(sprite, item))
      .filter(Boolean)
      .sort((a, b) => {
        return VARIANT_ORDER.indexOf(a.id) - VARIANT_ORDER.indexOf(b.id);
      });

    return {
      ...sprite,
      variants
    };
  });
}

function buildVariant(sprite, item) {
  const config = typeof item === "string"
    ? { id: item }
    : item;

  const variantBase = VARIANTS[config.id];

  if (!variantBase) {
    console.warn(`Variante no existe: ${config.id}`);
    return null;
  }

  const status = config.status || STATUS.ACTIVE;

  const title = config.id === "base"
    ? sprite.nameES
    : `${variantBase.name} ${sprite.nameES}`;

  const rarity = config.id === "base"
    ? sprite.rarity
    : "Especial";

  const image = config.image || `img/${sprite.id}-${config.id}.png`;
  const key = `${sprite.id}-${config.id}`;

  return {
    ...variantBase,
    key,
    title,
    rarity,
    status,
    image,
    spriteId: sprite.id,
    spriteNameES: sprite.nameES,
    spriteNameEN: sprite.nameEN,
    searchText: normalizeText([
      sprite.id,
      sprite.nameES,
      sprite.nameEN,
      sprite.rarity,
      sprite.ability,
      sprite.location,
      variantBase.id,
      variantBase.name,
      title,
      rarity,
      status
    ].join(" "))
  };
}