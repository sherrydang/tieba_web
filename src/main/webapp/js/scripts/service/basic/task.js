/**
 * Created by alexcai on 15/3/18.
 */
define(['app'], function (app) {
    'use strict';
    app.factory('TaskService', TaskService);
});
function TaskService($http, data_host) {
    return {
        tasks: function () {
            return $http.get(data_host + "/ctrl/task/tasks");
        },
        getGpsByVehicle: function (object) {
            var s = "";
            for (var i = 0; i < object.length; i++) {
                s += "id=" + object[i].id + "&"
            }
            return $.getJSON(data_host + "/ctrl/api/getgpsbyvehicle?" + s);
        },
        solutionLogs: function (plan_id, page, size) {
            return $http.get(data_host + "/ctrl/task/manual/solution/logs?plan_id=" + plan_id + "&page=" + page + "&size=" + size);
        },
        solutionList: function () {
            return $http.get(data_host + "/ctrl/task/manual/solution/list");
        },
        solutionNew: function (name) {
            return $http.post(data_host + "/ctrl/task/manual/solution/new?name=" + name);
        },
        solutionUpdate: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/update?plan_id=" + plan_id);
        },
        solutionSave: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/save?plan_id=" + plan_id);
        },
        solutionExecute: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/execute?plan_id=" + plan_id);
        },
        solutionPause: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/pause?plan_id=" + plan_id);
        },
        solutionContinue: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/continue?plan_id=" + plan_id);
        },
        solutionStop: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/stop?plan_id=" + plan_id);
        },
        solutionCancel: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/cancel?plan_id=" + plan_id);
        },
        solutionDelete: function (plan_id) {
            return $http.post(data_host + "/ctrl/task/manual/solution/delete?plan_id=" + plan_id);
        },
        modifySolutionName: function (plan_id, name) {
            return $http.post(data_host + "/ctrl/task/manual/solution/modifyName?plan_id=" + plan_id + "&name=" + name);
        },
        vehicleUsable: function (plan_id) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/usable?plan_id=" + plan_id);
        },
        vehicleBinded: function (plan_id) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/bound?plan_id=" + plan_id);
        },
        vehicleBind: function (plan_id, vehicleIds) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/bind?plan_id=" + plan_id + vehicleIds);
        },
        vehicleUnbind: function (plan_id, vehicleIds) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/unbind?plan_id=" + plan_id + vehicleIds);
        },

        demandUsable: function (plan_id, page, size) {
            return $http.get(data_host + "/ctrl/task/manual/demand/usable?plan_id=" + plan_id + "&size=" + size + "&page=" + page);
        },
        demandBinded: function (plan_id, page, size) {
            return $http.get(data_host + "/ctrl/task/manual/demand/bound?plan_id=" + plan_id + "&size=" + size + "&page=" + page);
        },
        demandBind: function (plan_id, taskObjectIds) {
            return $http.get(data_host + "/ctrl/task/manual/demand/bind?plan_id=" + plan_id + taskObjectIds);
        },
        demandUnbind: function (plan_id, taskObjectIds) {
            return $http.get(data_host + "/ctrl/task/manual/demand/unbind?plan_id=" + plan_id + taskObjectIds);
        },
        demandEdit: function (plan_id, demand) {
            return $http.post(data_host + "/ctrl/task/manual/demand/edit?plan_id=" + plan_id + "&demand=" + demand);
        },
        modifyDemandToVehicle: function (plan_id, vehicleId, taskObjectIds) {
            return $http.get(data_host + "/ctrl/task/manual/divide/bind?plan_id=" + plan_id + "&vehicle_id=" + vehicleId + taskObjectIds);
        },
        distributableDemand: function (plan_id, page, size, params) {
            return $http.get(data_host + "/ctrl/task/manual/divide/distributable?plan_id=" + plan_id + "&size=" + size + "&page=" + page + (params != null ? params : ''));
        },
        bindedFromVehicle: function (plan_id, vehicle_id) {
            return $http.get(data_host + "/ctrl/task/manual/divide/boundFromVehicle?plan_id=" + plan_id + "&vehicle_id=" + vehicle_id);
        },
        historyPlan: function (page, size) {
            return $http.get(data_host + "/ctrl/task/manual/history/plan?&size=" + size + "&page=" + page);
        },
        historyCollection: function (plan_id, start_date) {
            return $http.get(data_host + "/ctrl/task/manual/history/collection?plan_id=" + plan_id + "&start_date=" + start_date);
        },
        historyTask: function (collection_id) {
            return $http.get(data_host + "/ctrl/task/manual/history/task?collection_id=" + collection_id);
        }
        ,
        getVehiclesWithCache: function (plan_id) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/boundWithCache?plan_id=" + plan_id);
        },
        getDemandsWithCache: function (plan_id, page, size, params) {
            return $http.get(data_host + "/ctrl/task/manual/demand/boundWithCache?plan_id=" + plan_id + "&size=" + size + "&page=" + page + (params != null ? params : ""));
        },
        vehicleLock: function (plan_id, ids) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/lock?plan_id=" + plan_id + ids);
        },
        vehicleUnLock: function (plan_id, ids) {
            return $http.get(data_host + "/ctrl/task/manual/vehicle/unlock?plan_id=" + plan_id + ids);
        },
        leavePage: function (plan_id) {
            return $http.get(data_host + "/ctrl/task/manual/page/leave?plan_id=" + plan_id);
        },
        solutionCopy: function (plan_id) {
            return $http.get(data_host + "/ctrl/task/manual/solution/copy?plan_id=" + plan_id);
        }
    }
}