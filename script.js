document.addEventListener('click', function(event) {
    const searchBar = document.getElementById('search-bar');
    const suggestions = document.getElementById('suggestions');
    
    // Kiểm tra xem click có xảy ra ngoài thanh tìm kiếm hoặc danh sách đề xuất không
    if (!searchBar.contains(event.target) && !suggestions.contains(event.target)) {
        hideSuggestions(); // Ẩn danh sách đề xuất
    }
});

function selectSuggestion(suggestion) {
    // Lấy văn bản thuần từ đề xuất mà không bao gồm các thẻ HTML
    document.getElementById('search-bar').value = suggestion.querySelector('span').innerText || suggestion.querySelector('span').textContent;
    hideSuggestions(); // Ẩn danh sách đề xuất
}

function removeSuggestion(event) {
    event.stopPropagation(); // Ngăn chặn sự kiện nhấp vào li
    const suggestionItem = event.target.closest('li'); // Tìm phần tử li cha
    suggestionItem.remove(); // Xóa đề xuất
    // Kiểm tra xem còn đề xuất nào không
    if (document.querySelectorAll('#suggestions li').length === 0) {
        hideSuggestions(); // Ẩn danh sách đề xuất nếu không còn đề xuất
    }
}

function showSuggestions() {
    const suggestions = document.getElementById('suggestions');
    suggestions.classList.remove('opacity-0', 'pointer-events-none'); // Hiện danh sách đề xuất
}

function hideSuggestions() {
    setTimeout(() => {
        const suggestions = document.getElementById('suggestions');
        suggestions.classList.add('opacity-0', 'pointer-events-none'); // Ẩn danh sách đề xuất sau khi người dùng nhấp
    }, 200); // Thời gian trì hoãn để xử lý sự kiện
}

// Hàm để làm nổi bật đoạn chữ khớp
function highlightMatch(text, keyword) {
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, "<strong>$1</strong>");
}

// Cập nhật hàm filterSuggestions để lọc và làm nổi bật
function filterSuggestions() {
    const searchValue = document.getElementById('search-bar').value.toLowerCase();
    const suggestionItems = document.querySelectorAll('#suggestions li');

    let visibleCount = 0; // Đếm số lượng đề xuất hiển thị
    suggestionItems.forEach(item => {
        const suggestionText = item.querySelector('span').textContent.toLowerCase();
        if (suggestionText.includes(searchValue) && visibleCount < 5) {
            // Làm nổi bật phần chữ khớp
            const originalText = item.querySelector('span').textContent;
            const highlightedText = highlightMatch(originalText, searchValue);
            item.querySelector('span').innerHTML = highlightedText;
            item.style.display = ''; // Hiện đề xuất nếu phù hợp và dưới 5 đề xuất
            visibleCount++; // Tăng số lượng đề xuất hiển thị
        } else {
            item.style.display = 'none'; // Ẩn đề xuất nếu không phù hợp hoặc quá 5 mục
        }
    });
}

