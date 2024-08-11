const extractIdFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
};

export default extractIdFromUrl;
