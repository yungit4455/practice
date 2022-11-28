const deleteProduct = async btn => {
    const productId = btn.parentNode.querySelector('[name=productId]').value;
    // const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
  
    const productElement = btn.closest('article');
    try {
        productElement.parentNode.removeChild(productElement);
        const data = await fetch('/admin/product/' + productId, {
            method: 'DELETE',
            // headers: {
            //     'csrf-token': csrf
            // }  
        });   
    } catch (err) {
        console.log(err);
    }
};