export let currentPage = 1;

export function setCurrentPage(page) {
  currentPage = page;
}

export function incrementPage() {
  currentPage++;
}

export function decrementPage() {
  currentPage--;
}
