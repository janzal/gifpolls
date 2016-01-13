import Firebase from 'firebase';

class PollsRepository {
    constructor(config) {
      this.rootRef = new Firebase(config.firebase_url);
    }

    addPoll(name, { maxVotes = 1, voteOptions = [] } = {}) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }

      const pollRef = this.rootRef.child('polls/' + name);

      voteOptions = voteOptions.map(option => {
        option.score = 0;
        return option;
      });

      return new Promise((resolve, reject) => {
        pollRef.set({
          maxVotes,
          voteOptions
        }, err => {
          if (err) {
            reject(err);
          }

          resolve();
        });
      });
    }

    getPoll(name) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }

      const pollRef = this.rootRef.child('polls/' + name);
      return new Promise((resolve, reject) => {
        pollRef.once('value', snapshot => {
          resolve(snapshot);
        });
      });
    }

    vote(name, optionId) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }

      if (typeof optionId === 'undefined') {
        return Promise.reject(new Error('Option ID has to be defined'));
      }

      const scoreRef = this.rootRef.child('polls/' + name + '/voteOptions/' + optionId + '/score');

      return new Promise((resolve, reject) => {
        scoreRef.transaction(currentScore => currentScore + 1, (err) => {
          if (err) {
            reject(err);
          }

          resolve();
        });
      });
    }

    addImage(name, url) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }

      if (!url) {
        return Promise.reject(new Error('URL has to be defined'));
      }

      const pollRef = this.rootRef.child('polls/' + name + '/images');

      return new Promise((resolve, reject) => {
        pollRef.push(url, err => {
          if (err) {
            reject(err);
          }

          resolve();
        });
      });
    }

    addUser(name, email) {
      const pollRef = this.rootRef.child('polls/' + name + '/users');

      return new Promise((resolve, reject) => {
        pollRef.equalTo(email)
          .limitToFirst(1)
          .once('value', snapshot => {
            if (snapshot.exists()) {
              return resolve();
            }

            pollRef.push(email, err => {
              if (err) {
                return reject(err);
              }

              resolve();
            })
          });
      });
    }

    removeUser(name, email) {
      const pollRef = this.rootRef.child('polls/' + name + '/users');

      return new Promise((resolve, reject) => {
        pollRef.equalTo(email)
          .limitToFirst(1)
          .once('value', snapshot => {
            if (snapshot.exists()) {
              snapshot.ref().set(null, err => {
                if (err) {
                  return reject(err);
                }

                resolve();
              });
            } else {
              resolve();
            }
          });
      });
    }

    setUsersChangesListener(name, callback) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }

      const pollRef = this.rootRef.child('polls/' + name + '/users');
      pollRef.on('value', callback);
    }

    setResultsChangesListener(name, callback) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }


      const pollRef = this.rootRef.child('polls/' + name);
      pollRef.on('value', callback);
    }

    removeResultsChangesListener(name, callback) {
      if (!name) {
        return Promise.reject(new Error('Name has to be defined'));
      }

      const pollRef = this.rootRef.child('polls/' + name);
      pollRef.off('value', callback);
    }
}

let pollsRepository = null;
export default function getInstance() {
  if (!pollsRepository) {
    pollsRepository = new PollsRepository(require('../config.json'));
  }

  return pollsRepository;
}
