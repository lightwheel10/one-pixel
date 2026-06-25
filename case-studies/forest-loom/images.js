// Placeholder photography (Pexels CDN). Every URL curl-verified (HTTP 200, image/jpeg).
// Cinematic set is warm/moody/film-graded for the editorial lookbook; product set is
// neutral textile shots. Swap for the brand's own photography before going live.
const px = (id, w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMG = {
  // cinematic editorial (warm, moody)
  heroMain: px(14705601, 2400),   // man in a long overcoat on a stone ridge, golden valley
  heroAlt: px(16721382, 2400),    // woman in a woven wool shawl over warm rock formations
  heroC: px(10958554, 2400),      // man wrapped in a deep maroon wool shawl at dusk
  heroD: px(2213574, 2400),       // woman in a natural wrap on warm rock formations, golden hills
  lookMain: px(8796287, 1600),    // editorial figure in a natural linen suit, muted dusk
  craftMain: px(5908251, 1800),   // earthy linen draped in folds, warm directional light
  roomMain: px(7746045, 1800),    // warm living room, stone fireplace, earthy throws
  closingMain: px(19470574, 2400),// couple wrapped together in a shawl by a golden lake

  // categories (referenced by data; not rendered as tiles in the current home)
  catThrows: px(11125918, 1400),
  catWearables: px(19346997, 1400),
  catHome: px(30618181, 1400),

  // products
  pKora: px(4862928, 1400),
  pKhes: px(35197097, 1400),
  pStole: px(17325401, 1400),
  pScarf: px(7988399, 1400),
  pWrap: px(6630873, 1400),
  pNapkins: px(6378665, 1400),
  pRunner: px(4805775, 1400),
  pCushion: px(37023122, 1400),

  // makers
  maker1: px(6634689, 1400),   // hands weaving coloured threads on a loom
  maker2: px(8207648, 1400),   // weaver at a loom, warm workspace

  // product-detail gallery supporting shots
  detailMacro: px(6275937, 1400),   // extreme macro of handwoven cotton, threads + fringe
  foldedStack: px(14642652, 1400),  // neatly folded handwoven throws, warm muted tones
};
