export function handleDownload (file) {
  var uuid = file.uuid;
  this.$http
    .post(
      '/api/contract/topInfo/CommonFiles/detail/downloadFile',
      {uuid:uuid},
      { responseType:'blob' }
    )
    .then((res) => {
      const content = res.data;
      const blob = new Blob([content])
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', file.fileName);
      document.body.appendChild(link);
      link.click();
    })
}