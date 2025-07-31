export default function formaterPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}
