export default function to(promise) {
  return promise.then(
    response => [null, response],
    error => [error, null],
  );
}
