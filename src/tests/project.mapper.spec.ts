import * as apiModel from 'pods/project/api/project.api-model';
import * as viewModel from 'pods/project/project.vm';
import { mapProjectFromApiToVm } from 'pods/project/project.mapper';

describe('project.mapper specs', () => {
  it('should return empty viewModel.project when it feeds undifined', () => {
    //Arrange
    const project: apiModel.Project = undefined;
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });
  it('should return empty viewModel.project when it feeds null', () => {
    //Arrange
    const project: apiModel.Project = null;
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });
  it('should return a viewModel.project when it feeds a apiModel.project', () => {
    //Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test',
      isActive: true,
      employees: [],
    };
    const expectedResult: viewModel.Project = {
      id: '1',
      name: 'test',
      isActive: true,
      employees: [],
    };
    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(project);
    //Assert
    expect(result).toEqual(expectedResult);
  });
});
