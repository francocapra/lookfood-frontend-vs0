function getSamplePartnerCollection() {

    var collection = {
        PartnerCollection: {
            ProductCollection: [
                {
                    PartnerId: 'LFC0000001',
                    ProductId: 'LFPRD00001',
                    ProductName: 'Product 1'
                },
                {
                    PartnerId: 'LFC0000001',
                    ProductId: 'LFPRD00002',
                    ProductName: 'Product 2'
                },
                {
                    PartnerId: 'LFC0000001',
                    ProductId: 'LFPRD00003',
                    ProductName: 'Product 3'
                }
            ],
            ServiceCollection: [
                {
                    PartnerId: 'LFC0000001',
                    ServiceId: 'LFSVC00001',
                    ServiceName: 'Service 1'
                },
                {
                    PartnerId: 'LFC0000001',
                    ServiceId: 'LFSVC00002',
                    ServiceName: 'Service 2'
                },
                {
                    PartnerId: 'LFC0000001',
                    ServiceId: 'LFSVC00002',
                    ServiceName: 'Service 3'
                }
            ]
        }
    }

    return collection;

}