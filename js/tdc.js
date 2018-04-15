function getSamplePartnerCollection() {

    var collection = {
        PartnerCollection: {
            ProductCollection: [
                {
                    PartnerId: 'LFPRT00001',
                    ProductId: 'LFPRD00001',
                    ProductName: 'Product 1',
                    ResponsibleId:'LFPER00001',
                    ResponsibleName:'Franco Capra',
                    AuxiliaryId:'LFPER00002',
                    AuxiliaryName:'Guilherme Giani'
                },
                {
                    PartnerId: 'LFPRT00001',
                    ProductId: 'LFPRD00002',
                    ProductName: 'Product 2',
                    ResponsibleId:'LFPER00001',
                    ResponsibleName:'Franco Capra',
                    AuxiliaryId:'LFPER00002',
                    AuxiliaryName:'Guilherme Giani'
                },
                {
                    PartnerId: 'LFPRT00001',
                    ProductId: 'LFPRD00003',
                    ProductName: 'Product 3',
                    ResponsibleId:'LFPER00001',
                    ResponsibleName:'Franco Capra',
                    AuxiliaryId:'LFPER00002',
                    AuxiliaryName:'Guilherme Giani'
                }
            ],
            ServiceCollection: [
                {
                    PartnerId: 'LFPRT00001',
                    ServiceId: 'LFSVC00001',
                    ServiceName: 'Service 1',
                    ResponsibleId:'LFPER00001',
                    ResponsibleName:'Guilherme Giani'
                },
                {
                    PartnerId: 'LFPRT00001',
                    ServiceId: 'LFSVC00002',
                    ServiceName: 'Service 2',
                    ResponsibleId:'LFPER00001',
                    ResponsibleName:'Guilherme Giani'
                },
                {
                    PartnerId: 'LFPRT00001',
                    ServiceId: 'LFSVC00003',
                    ServiceName: 'Service 3',
                    ResponsibleId:'LFPER00001',
                    ResponsibleName:'Guilherme Giani'
                }
            ]
        }
    }

    return collection;

}