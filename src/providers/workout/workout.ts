import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../user/user';
import { SportProvider } from '../sport/sport';
import { ExerciseProvider } from '../exercise/exercise';
import { HttpHandler } from '../http/http';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkoutProvider {

  private endpoint: string = 'workouts/';

  constructor(
    public http:      HttpHandler,
    private storage:  Storage,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
  }

  //
  //
  // GETTERS
  //
  //

  public getGivenWorkouts(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.getWorkouts().then((allWorkouts: Array<any>) => {
        this.storage.get('givenWorkouts')
          .then(givenWorkouts => {
            let workoutList = allWorkouts.filter(workout => givenWorkouts.includes(workout.id));
            resolve(workoutList);
          });
       });
    });
    return promise;
  }

  public getCreatedWorkouts(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.getWorkouts().then((allWorkouts: Array<any>) => {
        this.storage.get('createdWorkouts')
          .then(createdWorkouts => {
            let workoutList = allWorkouts.filter(workout => createdWorkouts.includes(workout.id));
            resolve(workoutList);
          });
      });
    });
    return promise;
  }

  private getWorkouts(): Promise<any> {
    return this.storage.get('workouts');
  }

  public getWorkoutList(mode: string): Promise<any> {
    return mode === 'coach' ? this.getCreatedWorkouts() : this.getGivenWorkouts();
  }

  public getWorkout(workoutId): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => allWorkouts.find(workout => workout.id == workoutId));
  }

  public getDayExercises(workout, day): Array<any> {
    return (workout.exercises || []).filter(exercise => exercise.pivot.day === day);
  }

  public getDayExerciseKeys(workout, day): Array<any> {
    return this.getDayExercises(workout, day).map(exercise => exercise = exercise.id);
  }

  //
  //
  // ATUALIZAR
  //
  //

  public clearWorkoutDay(workout, day): Promise<any> {

    let filter = (exercise) => {
        if (exercise.pivot.day == day) {
          return false;
        } else {
          return true;
        }
      };

    workout.exercises = workout.exercises.filter(filter);

    return this.update(workout, 'clearedday');
  }

  public archive(workout, activeValue: boolean = false): Promise<any> {
    workout.active = activeValue;
    return this.update(workout, (activeValue ? 'unarchived' : 'archived'));
  }

  public update(workout, toast = 'uptated'): Promise<any> {
    return new Promise((resolve, reject) => {
      this.patch(workout).subscribe(updatedWorkout => {
        this.updateLocaly(updatedWorkout).then(() => {
          resolve(updatedWorkout);
          switch (toast) {
            case "uptated":
              this.showUpdatedToast();
              break;
            case "unarchived":
              this.showUnarchivedToast();
              break;
            case "archived":
              this.showArchivedToast();
              break;
            case "clearedday":
              this.showClearedDayToast();
              break;
            default:
              break;
          }
        });
      });
    });
  }

  private patch(workout): Observable<any> {
    return this.http.patch(this.endpoint + workout.id, workout);
  }

  private updateLocaly(updatedWorkout): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => {
        allWorkouts = allWorkouts
          .map(workout => (workout.id === updatedWorkout.id ? updatedWorkout : workout));

        return this.storage.set('workouts', allWorkouts);
      });
  }


  //
  //
  // INCLUIR
  //
  //

  public create(workout): Promise<any> {
    return new Promise((resolve, reject) => {
      this.post(workout).subscribe(createdWorkout => {
        this.createLocaly(createdWorkout).then(() => {
          resolve(createdWorkout);
          this.showCreatedToast();
        });
      });
    });
  }

  private post(workout): Observable<any> {
    return this.http.post(this.endpoint, workout);
  }

  private createLocaly(createdWorkout): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => {
        allWorkouts.push(createdWorkout);
        return  this.storage.set('workouts', allWorkouts)
      }).then((teste) => {
        return this.storage.get('createdWorkouts')
      }).then(createdIds => {
        createdIds.push(createdWorkout.id);
        return this.storage.set('createdWorkouts', createdIds)
      });
  }

  //
  //
  // COMPARTILHAR
  //
  //

  public syncPupilWorkouts(workoutIds, contactId): Promise<any> {
    // console.log(workoutIds, contactId);
    let promise = new Promise((resolve, reject) => {
      workoutIds = { workouts: workoutIds };
      this.http.patch('workouts/users/' + contactId + '/sync', workoutIds)
        .subscribe(workouts => {
          this.storage.set('workouts', workouts)
            .then(() => {
              this.showUpdatedSharedToast();
              resolve(true);
            });
        }, error => {
          reject(error);
          if (error.statusText == 'Not Found') {
            this.showErrorToast();
          } else if (error.statusText == '') {

          }
        });
    });
    return promise;
  }

  public syncWorkoutUsers(pupilIds, workoutId): Promise<any> {
    // console.log(pupilIds, workoutId);

    pupilIds = { pupils: pupilIds };

    return this.http.patch('workouts/' + workoutId + '/users/sync', pupilIds)
      .toPromise()
      .then(workouts => this.storage.set('workouts', workouts))
      .then(() => this.showUpdatedAccessToast());
  }


  //
  //
  // DELETE
  //
  //

  public promptDelete(workout): Promise<any> {
    return new Promise ((resolve, reject) => {
      let confirm = this.alertCtrl.create({
        title: 'Excluir',
        message: 'Tem certeza que deseja excluir a ficha ' + workout.name + '?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              // console.log('Disagree clicked');
              resolve(false);
            }
          },
          {
            text: 'Sim, excluir!',
            handler: () => {
              // console.log('Agree clicked');
              setTimeout(() =>
                this.remove(workout.id)
                  .then(result => resolve(result)), 100);
            }
          }
        ]
      });
      confirm.present();
    });
  }

  public remove(workoutId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.delete(workoutId).subscribe(() => {
        this.removeLocaly(workoutId).then(() => {
          resolve(true);
          this.showDeletedToast();
        });
      });
    });
  }

  private delete(workoutId): Observable<any> {
    return this.http.delete(this.endpoint + workoutId);
  }

  private removeLocaly(workoutId): Promise<any> {
    return this.getWorkouts()
      .then(allWorkouts => {
        allWorkouts = allWorkouts.filter(workout => workout.id !== workoutId);
        return  this.storage.set('workouts', allWorkouts)
      }).then((teste) => {
        // console.log('teste storage set', teste);
        return this.storage.get('createdWorkouts')
      }).then(createdIds => {
        createdIds = createdIds.filter(id => id != workoutId);
        return this.storage.set('createdWorkouts', createdIds)
      });
  }


  //
  //
  // TOASTS
  //
  //

  private showErrorToast() {
    this.showToast('Houve um erro ao processar a requisição, tente novamente');
  }

  private showSharedToast() {
    this.showToast('Ficha compartilhada!');
  }

  private showUpdatedAccessToast() {
    this.showToast('Acesso a esta ficha foi atualizado!');
  }

  private showUpdatedSharedToast() {
    this.showToast('Fichas compartilhadas foram atualizadas!');
  }

  private showArchivedToast() {
    this.showToast('Ficha arquivada!');
  }

  private showUpdatedToast() {
    this.showToast('Ficha atualizada!');
  }

  private showCreatedToast() {
    this.showToast('Ficha cadastrada!');
  }

  private showUnarchivedToast() {
    this.showToast('Ficha desarquivada!');
  }

  private showDeletedToast() {
    this.showToast('Ficha excluída!');
  }

  private showClearedDayToast() {
    this.showToast('Dia limpo!');
  }

  private showToast(msg: string) {
    setTimeout(() => {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2500
      });
      toast.present();
    }, 100);
  }

}
