function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'get';
  const props = PropertiesService.getScriptProperties();
  let count = Number(props.getProperty('pageCount') || 0);

  if (action === 'increment') {
    count += 1;
    props.setProperty('pageCount', String(count));
  }

  return ContentService
    .createTextOutput(JSON.stringify({ count: count }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}

/*
  使用方式：
  1. Google Apps Script 中建立新專案
  2. 將此檔案內容貼上
  3. 部署 > 新增部署 > 類型選擇「網頁應用程式」
  4. 允許存取權限設為「任何人」
  5. 複製部署後的 URL，貼到 index.html 的 GAS_WEB_APP_URL

  這個範例會以 Script Properties 儲存計數，適合一般單頁瀏覽計數。
*/
