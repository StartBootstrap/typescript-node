import { RoleName } from '#public-types/admin';

const testUserSam = {
    createUserData: {
        firstName: 'Sam',
        lastName: 'Malone',
        email: 'sam@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Sam'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.admin,
    },
};

const testUserRebecca = {
    createUserData: {
        firstName: 'Rebecca',
        lastName: 'Howe',
        email: 'rebecca@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Rebecca'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.admin,
    },
};

const testUserDianne = {
    createUserData: {
        firstName: 'Dianne',
        lastName: 'Chambers',
        email: 'dianne@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Dianne'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.editor,
    },
};

const testUserErnie = {
    createUserData: {
        firstName: 'Ernie',
        lastName: 'Pantusso',
        email: 'coach@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Ernie'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.editor,
    },
};

const testUserCarla = {
    createUserData: {
        firstName: 'Carla',
        lastName: 'Tortelli',
        email: 'carla@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Carla'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.editor,
    },
};

const testUserNorm = {
    createUserData: {
        firstName: 'Norm',
        lastName: 'Pereson',
        email: 'norm@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Norm'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.registered,
    },
};

const testUserCliff = {
    createUserData: {
        firstName: 'Cliff',
        lastName: 'Claven',
        email: 'cliff@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Cliff'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.registered,
    },
};

const testUserWoody = {
    createUserData: {
        firstName: 'Woody',
        lastName: 'Boyd',
        email: 'woody@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Woody'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.editor,
    },
};

const testUserFrasier = {
    createUserData: {
        firstName: 'Frasier',
        lastName: 'Crane',
        email: 'frasier@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Frasier'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.registered,
    },
};

const testUserPhil = {
    createUserData: {
        firstName: 'Phil',
        lastName: 'Perlman',
        email: 'phil@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Phil'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.guest,
    },
};

const testUserAl = {
    createUserData: {
        firstName: 'Al',
        lastName: 'Rosen',
        email: 'al@cheers.test',
        emailConfirmed: true,
        postMetaData: _generatePostMetaData('Al'),
    },
    password: '123123123',
    membershipData: {
        roleName: RoleName.guest,
    },
};

export const testUsers = [
    testUserSam,
    testUserRebecca,
    testUserDianne,
    testUserErnie,
    testUserCarla,
    testUserNorm,
    testUserCliff,
    testUserWoody,
    testUserFrasier,
    testUserPhil,
    testUserAl,
];

function _generatePostMetaData(titleCaseName: string) {
    const lowerCaseName = titleCaseName.toLowerCase();
    return {
        socialURLs: {
            website: {
                displayName: `${lowerCaseName}.test`,
                url: `https://${lowerCaseName}.test`,
            },
            twitter: {
                displayName: `${lowerCaseName}test`,
                url: `https://twitter.com/${lowerCaseName}test`,
            },
            github: {
                displayName: `${lowerCaseName}test`,
                url: `https://github.com/${lowerCaseName}test`,
            },
        },
        bio: `${titleCaseName} is a test user.`,
        profileImage: {
            medium: '',
            alt: `${titleCaseName} test profile image`,
        },
    };
}
