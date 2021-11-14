const getBase64 = (file: File, callback: Function) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (err) => console.log('Error: ', err);
};

export default getBase64;
