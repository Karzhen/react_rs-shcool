export const convertToCSV = (data: any[]): string => {
    if (data.length === 0) return '';

    // Get headers from the keys of the first object
    const headers = Object.keys(data[0]);

    // Convert headers to CSV format
    const csvRows = [headers.join(',')];

    // Convert rows to CSV format
    data.forEach((row) => {
        const values = headers.map((header) => JSON.stringify(row[header]));
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
};

export const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        // feature detection
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
